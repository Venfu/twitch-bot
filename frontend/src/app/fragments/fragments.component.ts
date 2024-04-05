import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-fragments',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './fragments.component.html',
  styleUrl: './fragments.component.scss',
})
export class FragmentsComponent {}
