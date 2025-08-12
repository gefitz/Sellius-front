import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioserviceService {
  apiUrl = 'https://localhost:7147/api/Usuario';
  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  createUsuario(usuairo: UsuarioModel) {
    console.log(usuairo);
    this.http.post(this.apiUrl, usuairo).subscribe({
      next: (response) => {
        if (response) {
          this.snack.open('Sucesso ao criar usuario', 'Ok', { duration: 1000 });
          this.router.navigateByUrl('/Login');
        }
      },
      error: (e) => {
        this.snack.open(e.error.errorMessage, 'Ok', { duration: 5000 });
      },
    });
  }
}
