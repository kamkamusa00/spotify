import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {
    this.authService.init(this.activeRoute);
  }
}
