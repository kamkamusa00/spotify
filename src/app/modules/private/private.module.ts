import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PrivateMainComponent } from './components/private-main/private-main.component';
import { PlaylistsModule } from './modules/playlists/playlists.module';

console.log('private module')

const routes: Routes = [

  {
    path: '',
    component: PrivateMainComponent,
    children:[
      {
        path: 'lists',
        loadChildren:  async (): Promise<PlaylistsModule> =>
          (
            await import(
              './modules/playlists/playlists.module'
            )
          ).PlaylistsModule,
      },
      {
        path: '',
        redirectTo:'lists'
      },

    ]
  },
];

@NgModule({
  declarations: [
    PrivateMainComponent
  ],
  imports:[SharedModule, RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class PrivateModule { }
