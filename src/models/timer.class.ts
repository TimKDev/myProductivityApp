import { BehaviorSubject } from "rxjs";

export class Timer {

  secondsLeft!: number;
  timerStarted = false;
  setIntervalRef!: any;
  timerFinished = new BehaviorSubject(false);
  clock = [1,0];
  
  constructor(secondsLeft?: number){
    this.secondsLeft = secondsLeft ? secondsLeft : 10; 
  }

  removeSecond() {
    this.secondsLeft--;
    console.log('secondsLeft:', this.secondsLeft);
    
    this.clock = this.convertTimeToClock();
    if (this.isTimerFinished()) {
      this.finishTimer();
    }
  }

  finishTimer() {
    this.timerFinished.next(true);
    this.pause();
  }

  isTimerFinished() {
    return this.secondsLeft == 0;
  }

  play() {
    if (this.timerStarted) return;
    console.log(this.secondsLeft);
    
    this.timerStarted = true;
    this.setIntervalRef = setInterval(() => {this.removeSecond()}, 1000);
  }

  pause() {
    console.log(this.secondsLeft);
    
    this.timerStarted = false;
    clearInterval(this.setIntervalRef);
  }

  convertTimeToClock(): [number, number] {
    return [(this.secondsLeft - (this.secondsLeft % 60))/60, this.secondsLeft % 60];
  }

  addFiveMinutes() {
    this.secondsLeft += 5*60;
  }

}





// start() {
//   if(!this.timerPaused) return;
//   this.startTime += (new Date()).getTime() - this.pauseTime;
//   if(this.timerFinished) this.startTime = (new Date()).getTime();
//   this.timerFinished = false;
//   this.timerPaused = false;
//   this.activeTimer = setInterval(() => {this.addSecond()}, 100)
// }

// pause() {
//   this.timerPaused = true;
//   this.pauseTime = (new Date()).getTime();
//   clearInterval(this.activeTimer);
// }

// restart() {
//   if(!this.activeTimer) return;
//   clearInterval(this.activeTimer);
//   this.seconds = 0;
//   this.numAddedFiveMinutes = 0;
//   this.clock = [this.clockMinuteStart, 0];
//   this.currentTaskId = 'unset';
//   this.timerPaused = true;
//   this.timerFinished = true;
//   this.activeTimer = null;
// }