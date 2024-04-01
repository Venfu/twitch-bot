import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { EventToDisplay } from '@venfu-bot/shared';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  ws = new WebSocket(environment.URL_WEBSOCKET_SERVER);

  eventsToDisplay$: Subject<EventToDisplay> = new Subject<EventToDisplay>();

  constructor() {
    this.ws.onmessage = (e) => {
      this.eventsToDisplay$.next(JSON.parse(e.data));
    };
  }
}
