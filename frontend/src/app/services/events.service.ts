import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { EventToDisplay } from 'src/shared';

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
