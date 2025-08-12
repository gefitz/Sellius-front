import { Component } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-empresa-list',
  standalone: true,
  imports: [],
  templateUrl: './empresa-list.component.html',
  styleUrl: './empresa-list.component.css',
})
export class EmpresaListComponent {
  constructor(service: EmpresaService) {}
}
