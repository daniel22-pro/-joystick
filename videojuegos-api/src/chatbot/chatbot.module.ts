import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';

@Module({
  controllers: [ChatbotController],
  providers: [ChatbotService],
  exports: [ChatbotService], // Exportar si otros módulos necesitan usar el servicio
})
export class ChatbotModule {}
