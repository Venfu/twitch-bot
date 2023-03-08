import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// TODO
export class GameService {
  game: string;

  constructor(private http: HttpClient) {
    this.game = 'splatoon';
  }

  getCurrentGame() {}
}
