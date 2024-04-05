import { Component } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { BackgroundComponent } from '../../layout/background/background.component';

@Component({
  selector: 'app-doc',
  standalone: true,
  imports: [NavbarComponent, BackgroundComponent],
  templateUrl: './doc.component.html',
  styleUrl: './doc.component.scss',
})
export class DocComponent {}
