import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, AsyncPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private backend = inject(BackendService);
  isConnected$ = this.backend.botIsConnected();
}
