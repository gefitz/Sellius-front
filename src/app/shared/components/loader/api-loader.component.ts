import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../core/services/Api/api.service';
import { SharedModule } from '../Module/shared.module';

// Componente de Loader integrado ao ApiService
@Component({
  selector: 'app-api-loader',
  imports: [SharedModule],
  templateUrl: './api-loader.component.html',
  styleUrls: ['./api-loader.component.css'],
  standalone: true,
})
export class ApiLoaderComponent implements OnInit, OnDestroy {
  isLoading = false;
  private subscription: Subscription = new Subscription();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.subscription = this.apiService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
