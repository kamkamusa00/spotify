import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
console.log('login module');

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports:[SharedModule, RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class LoginModule { }
