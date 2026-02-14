import {inject, Injectable, signal } from '@angular/core';
import {apiUrls} from '../../../environments/api-urls';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TrackDto} from '../../models/track.dto';
import {CommentDto} from '../../models/comment.dto';
import {FileService} from '../file/file.service';

@Injectable({ providedIn: 'root' })
export class TrackService {
  fileService = inject(FileService);

  constructor(private http: HttpClient) {}

  private _selectedTrack = signal<any | null>(null);
  selectedTrack = this._selectedTrack.asReadonly();

  private _projectTracks = signal<TrackDto[]>([]);
  projectTracks = this._projectTracks.asReadonly();

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
    return this.http.get<TrackDto[]>(`${apiUrls.tracks}/project/${id}`);
  }

  updateTrackComments(comments: CommentDto[]) {
    const currentTrack = this._selectedTrack();
    if (currentTrack) {
      this._selectedTrack.set({ ...currentTrack, comments });
    }
  }

  uploadTrack(projectId: number, file: File, name: string) {
    return this.fileService.upload(apiUrls.tracks, file, {
      project_id: projectId,
      track_name: name
    });
  }

  refreshTracks(projectId: number) {
    this.getTracksByProject(projectId).subscribe(tracks => {
      this._projectTracks.set(tracks);
    });
  }
}
