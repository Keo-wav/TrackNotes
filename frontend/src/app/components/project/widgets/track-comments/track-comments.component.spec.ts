import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCommentsComponent } from './track-comments.component';

describe('TrackCommentsComponent', () => {
  let component: TrackCommentsComponent;
  let fixture: ComponentFixture<TrackCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackCommentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
