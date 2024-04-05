import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FollowerInfo } from '@venfu-bot/shared';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  URL_LAST_FOLLOWER = environment.URL_BACKEND + '/display/last-follower';
  private http = inject(HttpClient);

  getLastFollower(): Observable<FollowerInfo> {
    return this.http.get<FollowerInfo>(this.URL_LAST_FOLLOWER);
  }

  botIsConnected(): Observable<{ connected: boolean }> {
    return this.http.get<{ connected: boolean }>(
      environment.URL_BACKEND + '/connected'
    );
  }
}
