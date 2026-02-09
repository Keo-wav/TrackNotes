import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TrackService {
  private _selectedTrack = signal<any | null>(null);
  selectedTrack = this._selectedTrack.asReadonly();
  selectTrack(track: any) {
    this._selectedTrack.set(track);
  }
}
