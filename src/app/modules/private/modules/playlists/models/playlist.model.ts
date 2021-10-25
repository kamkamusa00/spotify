export interface PlaylistI {
  name: string
  id: string
  collaborative: boolean
}

export interface PlaylistItemsI<T> {
  items: T[]
  id: string
  name: string
  total: number
}

export interface PlaylistTrackI {
  track:TrackI
}

export interface TrackI {
  id: string;
  name: string;
  duration_ms: number;
  artists:ArtistI[]
}

export interface ArtistI {
  id: string;
  name: string;
}
