export interface EventToDisplay {
  type: string;
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
