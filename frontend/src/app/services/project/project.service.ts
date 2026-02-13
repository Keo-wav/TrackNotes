import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';
import {ProjectDto} from '../../models/project/project.dto';
import {apiUrls} from '../../../environments/api-urls';
import {CreateProjectDto} from '../../models/project/project-create.dto';
import {EditProjectDto} from '../../models/project/project-edit.dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectCreatedSource = new Subject<void>();
  projectCreated$ = this.projectCreatedSource.asObservable();

  constructor(private http: HttpClient) {}

  getProjects(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(apiUrls.projects);
  }

  getProjectById(id: number): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(`${apiUrls.projects}/${id}`)
  }

  create(project: CreateProjectDto): Observable<ProjectDto> {
    return this.http.post<ProjectDto>(apiUrls.projects, project).pipe(
      tap(() => this.projectCreatedSource.next())
    );
  }

  update(id: number, project: Partial<EditProjectDto>): Observable<ProjectDto> {
    return this.http.patch<ProjectDto>(`${apiUrls.projects}/${id}`, project);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrls.projects}/${id}`);
  }
}
