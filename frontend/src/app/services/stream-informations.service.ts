import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { StreamInformations } from 'src/shared';

@Injectable({
  providedIn: 'root',
})
export class StreamInformationsService {
  URL_STREAM_INFORMATIONS = environment.URL_BACKEND + '/stream-informations';

  get game(): string {
    const g = this._streamInformations.game_name || '';
    return this.gameList.includes(g) ? this.kebabCase(g) : 'default';
  }
  gameChange: Subject<any> = new Subject();
  newGame: string | undefined = undefined;

  _streamInformations: StreamInformations = {};
  gameList: string[] = ['Splatoon 3'];

  constructor(private http: HttpClient) {
    setInterval(() => this.getStreamInformations(), 5000);
  }

  getStreamInformations(): void {
    this.http
      .get<StreamInformations>(this.URL_STREAM_INFORMATIONS)
      .subscribe((si: StreamInformations) => {
        this._streamInformations = si;
        if (this.newGame !== si.game_name) {
          this.newGame = si.game_name;
          this.gameChange.next(true);
        }
      });
  }

  kebabCase(s: string): string {
    return s
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }
}
