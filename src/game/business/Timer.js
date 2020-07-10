import {Container, Text} from 'pixi.js';
import {createRoundedRectangle} from "../common/utils";
import {FONTS} from "../../config/resources";

export const TIMER_EVENT = {
    COMPLETE: 'COMPLETE',
    TICK: 'TICK'
};

export class Timer extends Container {
    constructor(initialTime) {
        super();

        this._initialTime = initialTime;
        this._createComponents();
        this._align();
    }

    _createComponents() {
        this._timerLabel = new Text('', {fontSize: 18, fill: '#000', fontFamily: FONTS.FONT_SECONDARY});
        this._timerLabel.text = this._format(this._initialTime);
        this._bg = createRoundedRectangle(100, 37, 0x00FFCC);
        this.addChild(this._bg);
        this.addChild(this._timerLabel);
    }

    start(seconds) {
        this.seconds = seconds;
        clearInterval(this.intervalID);
        this.emit(TIMER_EVENT.TICK, this.seconds);
        this._timerLabel.text = this._format(0);

        this.intervalID = setInterval(() => {
            this.seconds -= 1;
            this._timerLabel.text = this._format(this.seconds);
            this._align();
            if (this.seconds <= 0) {
                clearInterval(this.intervalID);
                this.emit(TIMER_EVENT.TICK, this.seconds);
                this.emit(TIMER_EVENT.COMPLETE);
                this._timerLabel.text = this._format(this._initialTime);
            } else {
                this.emit(TIMER_EVENT.TICK, this.seconds);
            }
        }, 1000);
    }

    _align() {
        this._timerLabel.x = this._bg.width / 2 - this._timerLabel.width / 2;
        this._timerLabel.y = this._bg.height / 2 - this._timerLabel.height / 2;
    }

    _format(sec) {
        let sec_num = parseInt(sec, 10);
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return hours + ':' + minutes + ':' + seconds;
    }
}
