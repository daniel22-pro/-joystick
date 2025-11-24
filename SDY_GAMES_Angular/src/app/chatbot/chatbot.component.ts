import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService, ChatMessage } from './chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent implements OnInit {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  messages: ChatMessage[] = [];
  newMessage = '';
  isLoading = false;
  isOpen = false;
  userId: string;

  constructor(private chatbotService: ChatbotService) {
    // Generar un ID único para el usuario
    this.userId = 'user_' + Math.random().toString(36).substring(2, 9);
  }

  ngOnInit(): void {
    // Mensaje de bienvenida
    this.messages.push({
      text: '¡Hola! Soy el asistente virtual de la tienda de videojuegos. ¿En qué puedo ayudarte?',
      isUser: false,
      timestamp: new Date(),
    });
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || this.isLoading) return;

    const userMessage = this.newMessage.trim();

    // Agregar mensaje del usuario
    this.messages.push({
      text: userMessage,
      isUser: true,
      timestamp: new Date(),
    });

    this.newMessage = '';
    this.isLoading = true;
    this.scrollToBottom();

    // Enviar mensaje a la API
    this.chatbotService.chat(this.userId, userMessage).subscribe({
      next: (response) => {
        this.messages.push({
          text: response.response,
          isUser: false,
          timestamp: new Date(),
        });
        this.isLoading = false;
        this.scrollToBottom();
      },
      error: (error) => {
        console.error('Error:', error);
        this.messages.push({
          text: 'Lo siento, hubo un error al procesar tu mensaje. Intenta de nuevo.',
          isUser: false,
          timestamp: new Date(),
        });
        this.isLoading = false;
        this.scrollToBottom();
      },
    });
  }

  clearChat(): void {
    this.chatbotService.clearHistory(this.userId).subscribe({
      next: () => {
        this.messages = [
          {
            text: '¡Chat reiniciado! ¿En qué puedo ayudarte?',
            isUser: false,
            timestamp: new Date(),
          },
        ];
      },
      error: (error) => {
        console.error('Error al limpiar historial:', error);
      },
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesContainer) {
        const container = this.messagesContainer.nativeElement;
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  }
}