import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpotifyUrlInterceptor } from './interceptors/spotifyUrInterceptors';
import { AuthModule } from '../auth/auth.module';
import { UserService } from './services/user/user.service';
import { ErrorManagerService } from './services/error-manager/error-manager.service';

@NgModule({
  imports: [
    HttpClientModule,
    AuthModule,
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: SpotifyUrlInterceptor, multi: true },
    UserService,
    ErrorManagerService,
   ]
})
export class CoreModule { }
