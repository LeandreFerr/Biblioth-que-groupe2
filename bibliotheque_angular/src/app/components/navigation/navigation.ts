import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../services/auth-service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navigation',
  styleUrl: './navigation.css',
  templateUrl: './navigation.html',
})
export class Navigation {

  private authService = inject(AuthService);
  private router = inject(Router);

  deconnexion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  estConnecte(): boolean {
    return this.authService.isAuthenticated();
  }


}