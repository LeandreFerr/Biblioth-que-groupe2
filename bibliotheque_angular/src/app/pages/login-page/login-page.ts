import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth-service';
import { LoginRequest } from '../../models/login';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.html'
})
export class LoginPage {

  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';

  erreur = '';

  seConnecter(): void {

    const credentials: LoginRequest = {
      username: this.username,
      password: this.password
    };

    this.erreur = '';

    this.authService.login(credentials).subscribe({

      next: () => {
        this.router.navigate(['/livre']);
      },

      error: () => {
        this.erreur = 'Identifiant ou mot de passe incorrect.';
      }

    });
  }
}