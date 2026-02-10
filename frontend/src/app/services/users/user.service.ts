import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDto} from '../../models/user.dto';
import {apiUrls} from '../../../environments/api-urls';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${apiUrls.users}/users`);
  }

  getUser(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${apiUrls.users}/?id=${id}`);
  }
}
