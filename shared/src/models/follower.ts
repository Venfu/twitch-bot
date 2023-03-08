export interface Follower {
  [key: string]: FollowerInfo;
}

export interface FollowerInfo {
  from_id: string;
  from_login: string;
  from_name: string;
  to_id: string;
  to_login: string;
  to_name: string;
  followed_at: string;
}
