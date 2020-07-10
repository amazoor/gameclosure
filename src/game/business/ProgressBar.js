import {Container, Text} from "pixi.js";
import {createRoundedRectangle} from "../common/utils";
import {FONTS} from "../../config/resources";

export const PROGRESS_BAR_EVENT = {
    CLICKED: 'CLICKED'
};

export class ProgressBar extends Container {
    constructor() {
        super();

        this._bg = createRoundedRectangle(295, 40);
        this._bar = createRoundedRectangle(295, 40, 0xCCFFFF);
        const mask = createRoundedRectangle(295, 40, 0xFFFFFF);
        this._label = new Text('', {fontFamily: FONTS.FONT_SECONDARY});
        this.addChild(this._bg);
        this.addChild(this._bar);
        this.addChild(this._label);
        this.addChild(mask);
        this._bar.mask = mask;
        this.setProgress(0);
        this.enable();

        this.on('pointertap', () => this.emit(PROGRESS_BAR_EVENT.CLICKED));
    }

    setProgress(percentage) {
        this._bar.width = this._bg.width * percentage / 100;
    }

    updateAmount(value) {
        this._label.text = value.toString();
        this._label.position.set(
            this._bg.width / 2 - this._label.width / 2,
            this._bg.height / 2 - this._label.height / 2,
        );
    }

    disable() {
        this.buttonMode = false;
        this.interactive = false;
    }

    enable() {
        this.buttonMode = true;
        this.interactive = true;
    }
}
