import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { ErrorManagerService } from 'src/app/modules/core/services/error-manager/error-manager.service';
import { PlaylistI } from '../../models/playlist.model';
import { PlaylistsService } from '../../services/playlists.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['playlists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistsComponent implements OnInit {
  playLists!: PlaylistI[];
  selectedPlayLists!: boolean[];

  constructor(
    private playListService: PlaylistsService,
    private router: Router,
    private errorManager: ErrorManagerService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getPlaylists();
  }

  trackById(i: number, item: PlaylistI): string {
    return item.id;
  }

  onSelectPlaylist(playList: PlaylistI, index: number): void {
    this.selectedPlayLists.forEach(
      (item: boolean, i) => (this.selectedPlayLists[i] = false)
    );
    this.selectedPlayLists[index] = true;
    this.router.navigate(['/private/lists', playList.id]);
  }

  getPlaylists(): void {
    this.playListService.getCurrentUserPlaylists().subscribe(
      (playLists: PlaylistI[]) => {
        this.selectedPlayLists = new Array<boolean>(playLists.length);
        this.playLists = playLists;
        this.changeDetector.detectChanges();
      },
      (error: HttpErrorResponse) => this.errorManager.showError(error)
    );
  }
}
