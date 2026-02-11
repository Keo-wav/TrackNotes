import { Component, inject, OnInit} from '@angular/core';
import {ProjectService} from '../../../../services/project/project.service';
import {Observable } from 'rxjs';
import {ProjectDto} from '../../../../models/project.dto';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-dashboard-projects',
  imports: [
    AsyncPipe
  ],
  templateUrl: './dashboard-projects.component.html',
  styleUrl: './dashboard-projects.component.css',
})
export class DashboardProjectsComponent implements OnInit {
  projectService = inject(ProjectService);
  projects$!: Observable<ProjectDto[]>;

  ngOnInit(): void {
    this.projects$ = this.projectService.getProjects();
  }
}
