import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackUploadModalComponent } from './track-upload-modal.component';

describe('TrackUploadModal', () => {
  let component: TrackUploadModalComponent;
  let fixture: ComponentFixture<TrackUploadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackUploadModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackUploadModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
