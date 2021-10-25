import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '@shared/shared.module'
import { PlaylistsComponent } from './components/playlists/playlists.component'
import { PlaylistsService } from './services/playlists.service'
import { AddPlaylistComponent } from './components/add-playlist/add-playlist.component'
import { PlaylistContentComponent } from './components/playlist-content/playlist-content.component'

console.log('playlists module')

const routes: Routes = [
  {
    path: '',
    component: PlaylistsComponent,
    children: [
      {
        path: ':id',
        component: PlaylistContentComponent
      },
    ]
  }
]

@NgModule({
  declarations: [
    PlaylistsComponent,
    AddPlaylistComponent,
    PlaylistContentComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PlaylistsService]
})
export class PlaylistsModule {}
