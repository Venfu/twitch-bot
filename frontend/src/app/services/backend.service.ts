import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FollowerInfo } from '@venfu-bot/shared';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  URL_LAST_FOLLOWER = environment.URL_BACKEND + '/display/last-follower';
  constructor(private http: HttpClient) {}

  getLastFollower(): Observable<FollowerInfo> {
    return this.http.get<FollowerInfo>(this.URL_LAST_FOLLOWER);
  }
}
