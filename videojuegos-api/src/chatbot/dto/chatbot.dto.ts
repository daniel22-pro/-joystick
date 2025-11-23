export class SendMessageDto {
  message: string;
}

export class ChatMessageDto {
  userId: string;
  message: string;
  systemPrompt?: string;
}

export class ChatResponseDto {
  success: boolean;
  response: string;
  userId?: string;
  timestamp: Date;
}
