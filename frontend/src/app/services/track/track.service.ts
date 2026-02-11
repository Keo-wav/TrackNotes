import { Injectable, signal } from '@angular/core';
import {apiUrls} from '../../../environments/api-urls';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TrackDto} from '../../models/track.dto';

@Injectable({ providedIn: 'root' })
export class TrackService {
  constructor(private http: HttpClient) {}
  private _selectedTrack = signal<any | null>(null);
  selectedTrack = this._selectedTrack.asReadonly();
  selectTrack(track: any) {
    this._selectedTrack.set(track);
  }

  getTracks(): Observable<TrackDto[]> {
    return this.http.get<TrackDto[]>(apiUrls.tracks);
  }

  getTrackById(id: number): Observable<TrackDto> {
    return this.http.get<TrackDto>(`${apiUrls.tracks}/${id}`);
  }

  getTracksByProject(id: number): Observable<TrackDto[]> {
    return this.http.get<TrackDto[]>(`${apiUrls.tracks}?id=${id}`);
  }
}
