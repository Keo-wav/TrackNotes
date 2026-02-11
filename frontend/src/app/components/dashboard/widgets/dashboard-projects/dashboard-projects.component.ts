import { Component, inject, OnInit} from '@angular/core';
import {ProjectService} from '../../../../services/project/project.service';
import {Observable, of} from 'rxjs';
import {ProjectDto} from '../../../../models/project.dto';

@Component({
  selector: 'app-dashboard-projects',
  imports: [],
  templateUrl: './dashboard-projects.component.html',
  styleUrl: './dashboard-projects.component.css',
})
export class DashboardProjectsComponent implements OnInit {
  projectService = inject(ProjectService);
  projects$: Observable<ProjectDto[]> = of([]);

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(
      (projects: ProjectDto[]) => {this.projects$ = of(projects);},
    )
  }
}
