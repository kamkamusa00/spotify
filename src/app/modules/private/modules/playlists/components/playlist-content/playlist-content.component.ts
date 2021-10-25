import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { getRouteParam } from '@shared/utils/getRouteParam.lib';
import { PlaylistItemsI, PlaylistTrackI } from '../../models/playlist.model';
import { PlaylistsService } from '../../services/playlists.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorManagerService } from 'src/app/modules/core/services/error-manager/error-manager.service';

const idName = 'id';

@UntilDestroy()
@Component({
  selector: 'app-playlist-content',
  templateUrl: './playlist-content.component.html',
  styleUrls: ['./playlist-content.component.scss']
})
export class PlaylistContentComponent implements OnInit {
  playlist: PlaylistItemsI<PlaylistTrackI>;
  playlistId: string;

  constructor(
    private playlistService: PlaylistsService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private errorManager: ErrorManagerService
  ) {
    this.playlistId = getRouteParam(activeRoute, idName);
  }

  ngOnInit(): void {
    this.getPlaylistContent();
    this.subscribeToPlaylistChange();
  }

  trackById(index: number, item: PlaylistTrackI): string {
    return item.track.id;
  }

  getPlaylistContent(): void {
    this.playlistService.getPlaylistTracks(this.playlistId).subscribe(
      (res: PlaylistItemsI<PlaylistTrackI>) => {
        this.playlist = res;
      },
      (error: HttpErrorResponse) => this.errorManager.showError(error)
    );
  }

  subscribeToPlaylistChange() {
    this.router.events.pipe(untilDestroyed(this)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        const newId = getRouteParam(this.activeRoute, idName);
        if (newId !== this.playlistId) {
          this.playlistId = newId;
          this.getPlaylistContent();
        }
      }
    });
  }
}
