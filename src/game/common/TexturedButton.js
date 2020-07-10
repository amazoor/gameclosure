import {Sprite, Text} from "pixi.js";
import {FONTS} from "../../config/resources";
import {SimpleButton} from "./SimpleButton";

export class TexturedButton extends SimpleButton {
    constructor({up, down, disabled}, text = '') {
        super();

        this.upState = new Sprite(up)
        this.downState = new Sprite(down)
        this.disabledState = new Sprite(disabled)
        this.label = new Text(text, {fontFamily: FONTS.FONT_SECONDARY});

        this.addChild(this.disabledState);
        this.addChild(this.downState);
        this.addChild(this.upState);
        this.addChild(this.label);
        this.label.position.set(this.upState.width / 2 - this.label.width / 2, this.upState.height / 2 - this.label.height / 2);

        //this._setupListeners();
        this.enable();
    }
}
