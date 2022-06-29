import { AfterViewInit, Component,  ElementRef,  Input,  OnInit,  SimpleChanges,  ViewChild } from '@angular/core';
@Component({
  selector: 'app-circle-progress',
  templateUrl: './circle-progress.component.html',
  styleUrls: ['./circle-progress.component.scss'],
})
export class CircleProgressComponent implements AfterViewInit {
  @Input() progress!: number;

  @ViewChild('progress') progressView!: ElementRef;

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData() {
    let scrollProgress = this.progressView.nativeElement;
    scrollProgress.style.background = `conic-gradient(#008fff ${this.progress}%, #f2f2f4 ${this.progress}%)`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.progressView) return;
    this.loadData();
  }
}
