import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProjectDto} from '../../models/project.dto';
import {apiUrls} from '../../../environments/api-urls';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(apiUrls.projects);
  }

  getProjectById(id: number): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(`${apiUrls.projects}/${id}`)
  }

  create(project: Partial<ProjectDto>): Observable<ProjectDto> {
    return this.http.post<ProjectDto>(apiUrls.projects, project);
  }

  update(id: number, project: Partial<ProjectDto>): Observable<ProjectDto> {
    return this.http.put<ProjectDto>(`${apiUrls.projects}/${id}`, project);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrls.projects}/${id}`);
  }
}
