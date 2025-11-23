import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GoogleGenerativeAI,
  GenerativeModel,
  ChatSession,
} from '@google/generative-ai';

@Injectable()
export class ChatbotService implements OnModuleInit {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  // Almacena las sesiones de chat por usuario
  private chatSessions: Map<string, ChatSession> = new Map();

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    // Inicializa el cliente de Gemini al arrancar el módulo
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY no está configurada');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: 'models/gemini-1.5-pro',
    });
  }

  /**
   * Envía un mensaje simple sin contexto de conversación
   */
  async sendMessage(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Error al comunicarse con Gemini: ${errorMessage}`);
    }
  }

  /**
   * Inicia o continúa una conversación con historial
   * @param userId - Identificador único del usuario
   * @param message - Mensaje del usuario
   */
  async chat(userId: string, message: string): Promise<string> {
    try {
      let chatSession = this.chatSessions.get(userId);

      // Si no existe una sesión para este usuario, crear una nueva
      if (!chatSession) {
        chatSession = this.model.startChat({
          history: [],
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7,
          },
        });
        this.chatSessions.set(userId, chatSession);
      }

      // Enviar mensaje y obtener respuesta
      const result = await chatSession.sendMessage(message);
      const response = result.response;

      return response.text();
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
    this.chatSessions.delete(userId);
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
      const chatSession = this.model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }],
          },
          {
            role: 'model',
            parts: [{ text: 'Entendido. Seguiré esas instrucciones.' }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      });

      const result = await chatSession.sendMessage(message);
      return result.response.text();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Error en el chat: ${errorMessage}`);
    }
  }
}
