import {Text, Container} from "pixi.js";
import {FONTS} from "../../config/resources";
import {createRoundedRectangle} from "./utils";

export const BUTTON_EVENTS = {
    CLICKED: 'CLICKED'
};

export class SimpleButton extends Container {
    constructor(width, height, text = '', color = 0xCC00CC) {
        super();

        this.upState = createRoundedRectangle(width, height, color);
        this.downState = createRoundedRectangle(width, height, color + 200);
        this.disabledState = createRoundedRectangle(width, height, 0xCCCCCC)
        this.label = new Text(text, {fontFamily: FONTS.FONT_SECONDARY});

        this.addChild(this.disabledState);
        this.addChild(this.downState);
        this.addChild(this.upState);
        this.addChild(this.label);
        this.label.position.set(this.upState.width / 2 - this.label.width / 2, this.upState.height / 2 - this.label.height / 2);

        this._setupListeners();
        this.enable();
    }

    _setupListeners() {
        this.on('pointerup', this.onPointerUp.bind(this));
        this.on('pointerdown', this.onPointerDown.bind(this));
        this.on('pointerupoutside', this.onPointerUpOutside.bind(this));
    }

    onPointerUp() {
        if (this.interactive) {
            this.switchToUpState();
            this.emit(BUTTON_EVENTS.CLICKED);
        }
    }

    onPointerDown() {
        this.switchToDownState();
    }

    onPointerUpOutside() {
        this.switchToUpState();
    }


    switchToUpState() {
        this.hideAllStates();
        this.upState.visible = true;
    }

    switchToDownState() {
        this.hideAllStates();
        this.downState.visible = true;
    }

    switchToDisabledState() {
        this.hideAllStates();
        this.disabledState.visible = true;
    }

    hideAllStates() {
        this.downState.visible = false;
        this.upState.visible = false;
        this.disabledState.visible = false;
    }

    disable() {
        this.switchToDisabledState();
        this.buttonMode = false;
        this.interactive = false;
    }

    enable() {
        this.switchToUpState();
        this.buttonMode = true;
        this.interactive = true;
    }
}
