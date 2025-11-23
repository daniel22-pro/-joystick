import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import {
  SendMessageDto,
  ChatMessageDto,
  ChatResponseDto,
} from './dto/chatbot.dto';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  /**
   * POST /chatbot/message
   * Envía un mensaje simple sin historial de conversación
   */
  @Post('message')
  async sendMessage(@Body() dto: SendMessageDto): Promise<ChatResponseDto> {
    try {
      const response = await this.chatbotService.sendMessage(dto.message);

      return {
        success: true,
        response,
        timestamp: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST /chatbot/chat
   * Envía un mensaje manteniendo el historial de conversación
   */
  @Post('chat')
  async chat(@Body() dto: ChatMessageDto): Promise<ChatResponseDto> {
    try {
      let response: string;

      // Si hay un system prompt, usar el método especializado
      if (dto.systemPrompt) {
        response = await this.chatbotService.chatWithSystemPrompt(
          dto.userId,
          dto.message,
          dto.systemPrompt,
        );
      } else {
        response = await this.chatbotService.chat(dto.userId, dto.message);
      }

      return {
        success: true,
        response,
        userId: dto.userId,
        timestamp: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * DELETE /chatbot/history/:userId
   * Limpia el historial de conversación de un usuario
   */
  @Delete('history/:userId')
  clearHistory(@Param('userId') userId: string) {
    this.chatbotService.clearHistory(userId);

    return {
      success: true,
      message: `Historial del usuario ${userId} eliminado`,
      timestamp: new Date(),
    };
  }
}
