import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatResponse {
  success: boolean;
  response: string;
  userId?: string;
  timestamp: Date;
}

export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = 'http://localhost:3002/chatbot';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.apiUrl}/message`, { message });
  }

  chat(userId: string, message: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.apiUrl}/chat`, {
      userId,
      message,
    });
  }

  clearHistory(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/history/${userId}`);
  }
}