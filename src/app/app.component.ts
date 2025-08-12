import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './shared/sidenav/component/sidenav/sidenav.component';
import { LoginService } from './pages/login/services/login.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, CommonModule, LoginComponent],
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
