import { Component, inject, OnInit} from '@angular/core';
import {ProjectService} from '../../../../services/project/project.service';
import {Observable } from 'rxjs';
import {ProjectDto} from '../../../../models/project/project.dto';
import {AsyncPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard-projects',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './dashboard-projects.component.html',
  styleUrl: './dashboard-projects.component.css',
})
export class DashboardProjectsComponent implements OnInit {
  projectService = inject(ProjectService);
  projects$!: Observable<ProjectDto[]>;

  ngOnInit(): void {
    this.loadProjects();

    this.projectService.projectCreated$.subscribe(() => {
      this.loadProjects();
    });
  }

  loadProjects(): void {
    this.projects$ = this.projectService.getProjects();
  }
}
