import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  PlaylistI,
  PlaylistItemsI,
  PlaylistTrackI
} from '../models/playlist.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from '@shared/model/list.model';

@Injectable()
export class PlaylistsService {
  constructor(private http: HttpClient) {}

  getCurrentUserPlaylists(): Observable<PlaylistI[]> {
    const url = 'v1/me/playlists';

    return this.http
      .get<List<PlaylistI>>(url)
      .pipe(map((response) => response.items));
  }

  addPlaylist(userId: string, name: string): Observable<unknown> {
    const url = `v1/users/${userId}/playlists`;
    const body = { name };
    return this.http.post<unknown>(url, body);
  }

  getPlaylistTracks(
    playlistId: string
  ): Observable<PlaylistItemsI<PlaylistTrackI>> {
    const url = `v1/playlists/${playlistId}/tracks`;
    //const url = `v1/playlists/${playlistId}`

    return this.http.get<PlaylistItemsI<PlaylistTrackI>>(url);
  }
}
