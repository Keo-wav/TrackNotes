import {AfterViewInit, Component, computed, effect, ElementRef, inject, OnDestroy, ViewChild} from '@angular/core';
import {TrackService} from '../../../../services/track/track.service';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-track-player',
  standalone: true,
  imports: [],
  templateUrl: './track-player.component.html',
  styleUrl: './track-player.component.css'
})
export class TrackPlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('waveformContainer') waveformContainer!: ElementRef;

  trackService = inject(TrackService);
  currentTrack = this.trackService.selectedTrack;
  comments = computed(() => this.currentTrack()?.comments || []);
  private wavesurfer?: WaveSurfer;

  constructor() {
    effect(() => {
      const track = this.currentTrack();
      if (track && this.wavesurfer) {
        this.wavesurfer.load('/assets/audio/test.mp3');
      }
    });
  }

  ngAfterViewInit() {
    if (this.waveformContainer) {
      this.wavesurfer = WaveSurfer.create({
        container: this.waveformContainer.nativeElement,
        waveColor: '#4f4f4f',
        progressColor: '#2563eb',
        barWidth: 2,
        barGap: 3,
        height: 100,
      });

      if (this.currentTrack()) {
        this.wavesurfer.load('/assets/audio/test.mp3');
      }
    }
  }

  ngOnDestroy() {
    this.wavesurfer?.destroy();
  }

  getMarkerPosition(timestamp: number): string {
    const duration = this.wavesurfer?.getDuration() || 0;
    if (duration === 0) return '0%';
    return (timestamp / duration) * 100 + '%';
  }

  togglePlay() {
    this.wavesurfer?.playPause();
  }
}
