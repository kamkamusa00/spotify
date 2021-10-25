import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './modules/auth/guards/auth.guard'
import { LoginModule } from './modules/login/login.module'
import { PrivateModule } from './modules/private/private.module'

console.log('app routingmodule ')

const routes: Routes = [
  {
    path: 'private',
    loadChildren: async (): Promise<PrivateModule> =>
      (await import('./modules/private/private.module')).PrivateModule,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: async (): Promise<LoginModule> =>
      (await import('./modules/login/login.module')).LoginModule
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
