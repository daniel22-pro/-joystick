import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';
// Ajusta esta ruta según la ubicación de tu JuegosService
import { JuegosService } from '../juegos/juegos.service';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

@Injectable()
export class ChatbotService implements OnModuleInit {
  private groq: Groq;
  private chatHistories: Map<string, ChatMessage[]> = new Map();

  constructor(
    private configService: ConfigService,
    private juegosService: JuegosService,
  ) {}

  onModuleInit() {
    const apiKey = this.configService.get<string>('GROQ_API_KEY');

    if (!apiKey) {
      throw new Error('GROQ_API_KEY no está configurada');
    }

    this.groq = new Groq({ apiKey });
  }

  private formatJuego(j: {
    nombre: string;
    precio: number;
    genero: string;
    plataforma: string;
  }): string {
    return `- ${j.nombre}: $${j.precio} | Género: ${j.genero} | Plataforma: ${j.plataforma}`;
  }

  private async getJuegoContext(message: string): Promise<string> {
    const lowerMessage = message.toLowerCase();
    let context = '';

    console.log('=== CHATBOT DEBUG ===');
    console.log('Mensaje recibido:', message);

    // SIEMPRE consultar si menciona "juego"
    if (lowerMessage.includes('juego')) {
      const todosLosJuegos = await this.juegosService.findAll();
      console.log('Juegos encontrados en BD:', todosLosJuegos.length);

      if (todosLosJuegos.length > 0) {
        const listaJuegos = todosLosJuegos
          .map((j) => this.formatJuego(j))
          .join('\n');
        context = `CATÁLOGO (${todosLosJuegos.length} juegos):\n${listaJuegos}`;
      } else {
        context = 'No hay juegos cargados en la base de datos.';
      }
    }

    // Juegos baratos
    if (
      lowerMessage.includes('barato') ||
      lowerMessage.includes('económico') ||
      lowerMessage.includes('menor precio') ||
      lowerMessage.includes('más baratos')
    ) {
      const juegosBaratos = await this.juegosService.findCheapest(5);
      console.log('Juegos baratos encontrados:', juegosBaratos.length);

      if (juegosBaratos.length > 0) {
        const listaBaratos = juegosBaratos
          .map((j) => this.formatJuego(j))
          .join('\n');
        context = `JUEGOS MÁS BARATOS:\n${listaBaratos}`;
      }
    }

    // Buscar por género
    if (lowerMessage.includes('género') || lowerMessage.includes('juegos de')) {
      const generos = [
        'acción',
        'aventura',
        'rol',
        'deportes',
        'terror',
        'shooter',
        'estrategia',
        'rpg',
        'simulación',
        'carreras',
      ];
      const generoEncontrado = generos.find((g) => lowerMessage.includes(g));

      if (generoEncontrado) {
        const juegos = await this.juegosService.findByGenre(generoEncontrado);
        console.log(`Juegos de ${generoEncontrado}:`, juegos.length);

        if (juegos.length > 0) {
          const listaGenero = juegos.map((j) => this.formatJuego(j)).join('\n');
          context = `JUEGOS DE ${generoEncontrado.toUpperCase()}:\n${listaGenero}`;
        } else {
          context = `No hay juegos de ${generoEncontrado}.`;
        }
      }
    }

    // Buscar por plataforma
    const plataformas = ['playstation', 'xbox', 'nintendo', 'pc', 'switch'];
    const plataformaEncontrada = plataformas.find((p) =>
      lowerMessage.includes(p),
    );

    if (plataformaEncontrada) {
      const juegos =
        await this.juegosService.findByPlatform(plataformaEncontrada);
      console.log(`Juegos para ${plataformaEncontrada}:`, juegos.length);

      if (juegos.length > 0) {
        const listaPlataforma = juegos
          .map((j) => this.formatJuego(j))
          .join('\n');
        context = `JUEGOS PARA ${plataformaEncontrada.toUpperCase()}:\n${listaPlataforma}`;
      } else {
        context = `No hay juegos para ${plataformaEncontrada}.`;
      }
    }

    // Estadísticas
    if (
      lowerMessage.includes('estadísticas') ||
      lowerMessage.includes('cuántos juegos') ||
      lowerMessage.includes('precio promedio')
    ) {
      const stats = await this.juegosService.getStats();
      context = `ESTADÍSTICAS:
- Total: ${stats.total} juegos
- Precio promedio: $${stats.avgPrice.toFixed(2)}
- Precio más bajo: $${stats.minPrice.toFixed(2)}
- Precio más alto: $${stats.maxPrice.toFixed(2)}`;
    }

    console.log('Contexto generado:', context);
    return context;
  }

  async sendMessage(prompt: string): Promise<string> {
    try {
      const juegoContext = await this.getJuegoContext(prompt);

      const systemPrompt = `Eres un asistente de una tienda de videojuegos.
IMPORTANTE: Responde SOLO con la información de la base de datos.
NO inventes juegos. Si no hay datos, di que no hay juegos disponibles.

DATOS DE LA BASE DE DATOS:
${juegoContext || 'No hay juegos en la base de datos.'}

Responde en español de forma amigable.`;

      const completion = await this.groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || 'Sin respuesta';
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Error con Groq: ${errorMessage}`);
    }
  }

  async chat(userId: string, message: string): Promise<string> {
    try {
      let history = this.chatHistories.get(userId);

      if (!history) {
        history = [
          {
            role: 'system',
            content: `Eres un asistente de una tienda de videojuegos.
Responde SOLO con información de la base de datos. NO inventes juegos.`,
          },
        ];
        this.chatHistories.set(userId, history);
      }

      const juegoContext = await this.getJuegoContext(message);

      const userMessage = juegoContext
        ? `${message}\n\n[DATOS]:\n${juegoContext}`
        : message;

      history.push({ role: 'user', content: userMessage });

      const completion = await this.groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: history,
        max_tokens: 1000,
        temperature: 0.7,
      });

      const assistantMessage =
        completion.choices[0]?.message?.content || 'Sin respuesta';

      history.push({ role: 'assistant', content: assistantMessage });

      return assistantMessage;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Error en el chat: ${errorMessage}`);
    }
  }

  clearHistory(userId: string): void {
    this.chatHistories.delete(userId);
  }

  async chatWithSystemPrompt(
    userId: string,
    message: string,
    systemPrompt: string,
  ): Promise<string> {
    try {
      const juegoContext = await this.getJuegoContext(message);

      const fullSystemPrompt = `${systemPrompt}

DATOS DE LA BASE DE DATOS:
${juegoContext || 'No hay datos.'}`;

      const messages: ChatMessage[] = [
        { role: 'system', content: fullSystemPrompt },
        { role: 'user', content: message },
      ];

      const completion = await this.groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || 'Sin respuesta';
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Error en el chat: ${errorMessage}`);
    }
  }
}
