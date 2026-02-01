import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './pages/login/services/login.service';

import { ApiLoaderComponent } from './core/services/Api/api.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ApiLoaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RoteiroFacil';
  _loginService: LoginService;
  constructor(loginService: LoginService) {
    this._loginService = loginService;
  }
}
