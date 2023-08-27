export interface ChatMessage {
  message: string;
  username: string;
  userPicture: string;
  userColor: string;
  emotes: { [key: string]: string[] } | null;
}
