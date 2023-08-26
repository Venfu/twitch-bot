import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { EventToDisplay } from 'src/shared';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  ws = new WebSocket(environment.URL_WEBSOCKET_SERVER);

  eventsToDisplay$: Subject<EventToDisplay> = new Subject<EventToDisplay>();

  constructor(private http: HttpClient, private gameService: GameService) {
    this.ws.onmessage = (e) => {
      this.eventsToDisplay$.next(JSON.parse(e.data));
    };
  }
}
