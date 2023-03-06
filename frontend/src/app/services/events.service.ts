import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { EventToDisplay } from '../../../../shared/src';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  URI_EVENTS = '/events';

  eventsToDisplay$: Subject<EventToDisplay> = new Subject<EventToDisplay>();

  constructor(private http: HttpClient) {
    this.recursiveCallEvents();
  }

  private recursiveCallEvents() {
    this.http
      .get<EventToDisplay>(`${environment.URL_BACKEND}${this.URI_EVENTS}`)
      .subscribe((e: EventToDisplay) => {
        if (e.type) {
          this.eventsToDisplay$.next(e);
        }
        setTimeout(() => this.recursiveCallEvents(), e.timeout || 1000);
      });
  }
}
