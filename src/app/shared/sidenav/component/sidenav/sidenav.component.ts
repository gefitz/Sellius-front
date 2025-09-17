import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter } from 'rxjs';
import { navItemsModel } from '../../models/navItemsModel.model';
import { LoginService } from '../../../../pages/login/services/login.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthGuardService } from '../../../../core/services/AuthGuard/auth-guard.service';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    CommonModule,
    MatListModule,
    MatMenuModule,
    RouterOutlet,
    MatTooltipModule,
    RouterLink,
    MatCardModule,
    MatExpansionModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  expanded = true;
  navItems: navItemsModel[] = [
    {
      icon: 'home',
      label: 'Início',
      route: '',
      children: [],
    },
    {
      icon: 'inventory',
      label: 'Produto',
      route: '/Produto',
      children: [
        {
          label: 'Produtos',
          icon: 'inventory',
          route: '/Produto',
        },
        {
          label: 'Tipo Produto',
          icon: 'label',
          route: '/Produto/TpProduto',
        },
      ],
    },
    {
      icon: 'person',
      label: 'Cliente',
      route: '/Cliente',
      children: [
        {
          label: 'Clientes',
          icon: 'people',
          route: '/Cliente',
        },
        {
          label: 'Segmentações',
          icon: 'category',
          route: '/Segmentacao',
        },
        {
          label: 'Grupos',
          icon: 'group_work',
          route: '/Grupo',
        },
      ],
    },
    {
      icon: 'shopping_cart',
      label: 'Pedido',
      route: '/Pedido',
      children: [],
    },
    {
      icon: 'domain',
      label: 'Fornecedores',
      route: '/Fornecedor',
      children: [],
    },
  ];
  isMobile = false;
  titulo: string = '';
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private routerActived: ActivatedRoute,
    private loginService: LoginService,
    private auth: AuthGuardService
  ) {
    this.vereficaIsMobile();
    this.tituloPage();
  }
  toogler() {
    if (this.expanded) {
      this.expanded = false;
    } else {
      this.expanded = true;
    }
  }
  vereficaIsMobile() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
        if (this.isMobile) {
          this.expanded = false;
        } else {
          this.expanded = true;
        }
      });
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
  sair() {
    this.loginService.sair();
  }
}
