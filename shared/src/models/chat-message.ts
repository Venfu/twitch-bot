export interface ChatMessage {
  formatedMessage: string;
  message: string;
  userName: string;
  userPicture: string;
  userColor: string;
  emotes: { [key: string]: string[] } | null;
  formatedBadges: string;
  badges: { [key: string]: string } | null;
  timestamp: string;
}
