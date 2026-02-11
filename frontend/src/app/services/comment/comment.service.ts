import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommentDto} from '../../models/comment.dto';
import {apiUrls} from '../../../environments/api-urls';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getComments(): Observable<CommentDto[]> {
    return this.http.get<CommentDto[]>(apiUrls.comments);
  }

  getCommentById(id: number): Observable<CommentDto> {
    return this.http.get<CommentDto>(`${apiUrls.comments}/${id}`)
  }

  // getCommentsByTrack(id_track: number): Observable<CommentDto[]> {
  //   return this.http.get<CommentDto[]>(apiUrls.comments);
  // }
}
