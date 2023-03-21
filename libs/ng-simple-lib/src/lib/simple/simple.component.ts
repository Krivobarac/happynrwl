import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'happynrwl-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
})
export class SimpleComponent implements OnInit, AfterViewInit {
  @ViewChild('marqueeGroup') marqueeGroup?: ElementRef;
  @ViewChild('marquee') marquee?: ElementRef;

  @Input() duration = 5;
  @Input() gap = 0;
  @Input() pause = false;
  @Input() direction: 'left' | 'right' = 'left';

  marqueeElement?: HTMLElement;
  marqueeGroupElement?: HTMLElement;
  clonedElement?: HTMLElement;

  @HostListener('window:resize', ['$event'])
  onResize() {
    // this.setStyle();
  }
    
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    // fromEvent(window, 'resize')  Doesn't work correctly
    //   .pipe(debounceTime(150))
    //   .subscribe(_ => this.onResize());
  }

  ngAfterViewInit(): void {
    if ( this.marqueeGroup && this.marquee ) {
      this.marqueeGroupElement = (this.marqueeGroup?.nativeElement as HTMLElement);
      this.marqueeElement = (this.marquee?.nativeElement as HTMLElement);

      if (this.marqueeGroupElement?.hasChildNodes()) {
        const clonedEl = this.marqueeGroup && (this.marqueeGroup.nativeElement as HTMLElement).cloneNode(true);
        this.marqueeElement.append(clonedEl)
        this.clonedElement = clonedEl as HTMLElement;
      }
    }

    this.setStyle();
  }

  private setStyle() {
    if (this.marqueeElement && this.marqueeGroupElement && this.clonedElement) {
      if (this.marqueeElement.offsetWidth > this.marqueeGroupElement.offsetWidth) {
        this.marqueeGroupElement.style.minWidth = '100%';
        this.marqueeGroupElement.style.justifyContent = 'space-around';
        this.clonedElement.style.minWidth = '100%';
        this.clonedElement.style.justifyContent = 'space-around';
      } else {
        this.marqueeGroupElement.style.minWidth = 'unset';
        this.marqueeGroupElement.style.justifyContent = 'unset';
        this.clonedElement.style.minWidth = 'unset';
        this.clonedElement.style.justifyContent = 'unset';
      }
  
      this.setMarqueAnimation();

      if (this.pause) {
        this.marqueeElement.addEventListener('mouseover', () => this.pauseAnimation(true));
        this.marqueeElement.addEventListener('mouseout', () => this.pauseAnimation(false));
        this.marqueeElement.addEventListener('touchstart', () => this.pauseAnimation(true));
        this.marqueeElement.addEventListener('touchend', () => this.pauseAnimation(false));
      }
    }
  }

  setMarqueAnimation() {
    if (this.marqueeGroupElement && this.clonedElement) {
      const keyframes = `
      @keyframes looping {
        0% {
          transform: translateX(0);
        }
      
        100% {
          transform: translateX(calc(-100% - ${this.gap}px));
        }
      }`;
      document.styleSheets[0].insertRule(keyframes, 0);

      this.marqueeGroupElement.style.animation = `looping ${this.duration}s linear infinite`;
      this.clonedElement.style.animation = `looping ${this.duration}s linear infinite`;
      
      if (this.direction === 'right') {
        this.marqueeGroupElement.style.animationDirection = 'reverse';
        this.clonedElement.style.animationDirection = 'reverse';
      }
    }
  }

  pauseAnimation(paused: boolean) {
    if (this.marqueeGroupElement && this.clonedElement) {
      this.marqueeGroupElement.style.animationPlayState = paused ? 'paused' : 'running';
      this.clonedElement.style.animationPlayState = paused ? 'paused' : 'running';
    }
  }
}

