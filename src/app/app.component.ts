import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;

  constructor(public authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.authService.loginState.subscribe(loggedIn => this.isLoggedIn = loggedIn);
  }
}
