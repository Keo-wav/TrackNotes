import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCreateModalComponent } from './project-create-modal.component';

describe('ProjectCreateModalComponent', () => {
  let component: ProjectCreateModalComponent;
  let fixture: ComponentFixture<ProjectCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCreateModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
