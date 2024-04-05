import { Component } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';

@Component({
  selector: 'app-doc',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './doc.component.html',
  styleUrl: './doc.component.scss',
})
export class DocComponent {}
