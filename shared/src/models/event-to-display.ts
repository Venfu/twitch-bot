export interface EventToDisplay {
  type: string;
  message?: string;
  from?: string;
  to?: string;
  messagePlainText?: string;
  colors?: string[];
  animation?: AnimationToDisplay;
}

export interface AnimationToDisplay {
  sound?: string;
  animation?: string;
}
