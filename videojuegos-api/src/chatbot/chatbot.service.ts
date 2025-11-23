import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

@Injectable()
export class ChatbotService implements OnModuleInit {
  private groq: Groq;

  // Almacena el historial de chat por usuario
  private chatHistories: Map<string, ChatMessage[]> = new Map();

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const apiKey = this.configService.get<string>('GROQ_API_KEY');

    if (!apiKey) {
      throw new Error('GROQ_API_KEY no está configurada');
    }

    this.groq = new Groq({
      apiKey: apiKey,
    });
  }

  /**
   * Envía un mensaje simple sin contexto de conversación
   */
  async sendMessage(prompt: string): Promise<string> {
    try {
      const completion = await this.groq.chat.completions.create({
        model: 'llama-3.1-8b-instant', // Gratis y rápido
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || 'Sin respuesta';
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Error al comunicarse con Groq: ${errorMessage}`);
    }
  }

  /**
   * Inicia o continúa una conversación con historial
   */
  async chat(userId: string, message: string): Promise<string> {
    try {
      let history = this.chatHistories.get(userId);

      if (!history) {
        history = [];
        this.chatHistories.set(userId, history);
      }

      // Agregar mensaje del usuario al historial
      history.push({ role: 'user', content: message });

      const completion = await this.groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: history,
        max_tokens: 1000,
        temperature: 0.7,
      });

      const assistantMessage =
        completion.choices[0]?.message?.content || 'Sin respuesta';

      // Agregar respuesta al historial
      history.push({ role: 'assistant', content: assistantMessage });

      return assistantMessage;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Error en el chat: ${errorMessage}`);
    }
  }

  /**
   * Reinicia la conversación de un usuario
   */
  clearHistory(userId: string): void {
    this.chatHistories.delete(userId);
  }

  /**
   * Chat con instrucciones de sistema personalizadas
   */
  async chatWithSystemPrompt(
    userId: string,
    message: string,
    systemPrompt: string,
  ): Promise<string> {
    try {
      const messages: ChatMessage[] = [
        { role: 'system', content: systemPrompt },
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
