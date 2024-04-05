import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackgroundComponent } from '../../layout/background/background.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, BackgroundComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  initLogin() {
    window.location.href = 'http://localhost:3000/';
  }
}
