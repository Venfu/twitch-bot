export interface Follower {
  [key: string]: FollowerInfo;
}

export interface FollowerInfo {
  user_id: string;
  user_login: string;
  user_name: string;
  followed_at: string;
}
