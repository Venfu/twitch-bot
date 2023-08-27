import { Component, OnInit } from '@angular/core';
import { StreamInformationsService } from './services/stream-informations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  game = '';

  constructor(private streamInformationsService: StreamInformationsService) {}

  ngOnInit(): void {
    this.game = this.streamInformationsService.game;
    this.streamInformationsService.gameChange.subscribe((o) => {
      if (o) this.game = this.streamInformationsService.game;
    });
  }
}
