import { BehaviorSubject } from "rxjs";
// Das ist nur in der Refactor Branch!

export class Timer {

  secondsLeft!: number;
  timerStarted = false;
  setIntervalRef!: any;
  timerFinished = new BehaviorSubject(false);
  
  constructor(secondsLeft?: number){
    this.secondsLeft = secondsLeft ? secondsLeft : 10; 
  }

  removeSecond() {
    this.secondsLeft--;
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
    this.timerStarted = true;
    this.setIntervalRef = setInterval(() => {this.removeSecond()}, 1000);
  }

  pause() {
    this.timerStarted = false;
    clearInterval(this.setIntervalRef);
  }

  convertTimeToClock(): [number, number] {
    return [this.secondsLeft % 60, this.secondsLeft - (this.secondsLeft % 60)*60];
  }

  addFiveMinutes() {
    this.secondsLeft += 5*60;
  }

}