import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './pages/login/services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'RoteiroFacil';
  _loginService: LoginService;
  constructor(loginService: LoginService) {
    this._loginService = loginService;
  }
}
