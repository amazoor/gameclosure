import {Container, Text} from "pixi.js";
import {TexturedButton} from "../common/TexturedButton";
import {FONTS} from "../../config/resources";
import {BUTTON_EVENTS} from "../common/SimpleButton";

export const ITEM_EVENTS = {
    CLICKED: "ICON_CLICKED"
};

export class Icon extends Container {
    constructor({up, down, disabled}) {
        super();

        this._button = new TexturedButton({up, down, disabled});
        this._label = new Text('', {fontFamily: FONTS.FONT_SECONDARY});
        this.addChild(this._button);
        this.addChild(this._label);
        this.enable();

        this._button.on(BUTTON_EVENTS.CLICKED, () => {
            this.emit(ITEM_EVENTS.CLICKED);
        });
    }

    enable() {
        this._button.enable();
    }

    disable() {
        this._button.disable();
    }

    /**
     *
     * @param newAmount {number}
     */
    updateAmount(newAmount) {
        this._label.text = newAmount.toString();
        this._label.position.set(this.width / 2 - this._label.width / 2, this.height - this._label.height - 17);
    }
}
