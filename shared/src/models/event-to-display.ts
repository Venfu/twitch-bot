export interface EventToDisplay {
  type: 'none' | 'announce' | 'follow' | 'raid' | 'subscribe' | 'test';
  message?: string;
  from?: string;
  to?: string;
  messagePlainText?: string;
  color?: string;
  animation?: AnimationToDisplay;
  other?: any;
  timeout?: number;
}

export interface AnimationToDisplay {
  sound?: string;
  animation?: string;
}
