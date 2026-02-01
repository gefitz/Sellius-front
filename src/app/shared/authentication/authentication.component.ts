import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-authentication',
    imports: [
        RouterOutlet,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
    ],
    templateUrl: './authentication.component.html',
    styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  titulo: string = '';
  constructor(private router: Router, private routerActived: ActivatedRoute) {
    this.tituloPage();
  }
  tituloPage() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentPage = this.getPage(this.routerActived);
        this.titulo = currentPage.snapshot.data['title'];
      });
  }
  getPage(page: ActivatedRoute): ActivatedRoute {
    while (this.routerActived.firstChild) {
      return this.routerActived.firstChild;
    }
    return page;
  }
}
