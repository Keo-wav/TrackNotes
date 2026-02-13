import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComments } from './project-comments';

describe('ProjectComments', () => {
  let component: ProjectComments;
  let fixture: ComponentFixture<ProjectComments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectComments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectComments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
