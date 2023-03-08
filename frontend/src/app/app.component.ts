import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  game = '';

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.game = this.gameService.game;
  }
}
