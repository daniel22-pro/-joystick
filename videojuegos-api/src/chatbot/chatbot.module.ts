import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
// Ajusta la ruta según tu estructura de carpetas
import { JuegosModule } from '../juegos/juegos.module';

@Module({
  imports: [JuegosModule], // Importar el módulo de juegos
  controllers: [ChatbotController],
  providers: [ChatbotService],
  exports: [ChatbotService],
})
export class ChatbotModule {}
