import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './interceptors/auth.intercecptor';
import { AuthGuard } from './guards/auth.guard';
import { TestService } from './services/test/test.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthService,
    TestService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard
  ]
})
export class AuthModule {}
