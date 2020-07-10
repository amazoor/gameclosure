import {Container, Text} from "pixi.js";
import {TexturedButton} from "../common/TexturedButton";
import {FONTS, LoadedResources} from "../../config/resources";
import {BUTTON_EVENTS} from "../common/SimpleButton";
export const BUY_BUTTON_EVENTS = {
    CLICKED: 'CLICKED'
};
const SIDE_OFFSET = 10;

export class BuyButton extends Container {
    constructor() {
        super();

        this._createComponents();
        this._align();
        this.enable();
        this._button.on(BUTTON_EVENTS.CLICKED, this._onBuyButtonClicked.bind(this));
    }

    _createComponents() {
        this._button = new TexturedButton({
            up: LoadedResources.images.buy_up.texture,
            down: LoadedResources.images.buy_pressed.texture,
            disabled: LoadedResources.images.buy_up.texture
        });

        this._labelCaption = new Text('Buy', {fill: '#FFF', fontSize: 16, fonrFamily:FONTS.FONT_MAIN});
        this._labelPrice = new Text('-', {fill: '#FFF', fontSize: 18, fontFamily: FONTS.FONT_SECONDARY});

        this.addChild(this._button);
        this.addChild(this._labelCaption);
        this.addChild(this._labelPrice);
    }

    setPriceLabelText(text) {
        this._labelPrice.text = text;
        this._align();
    }

    enable() {
        this._button.enable();
    }

    disable() {
        this._button.disable();
    }

    _align() {
        this._labelPrice.position.set(this._button.width - this._labelPrice.width - SIDE_OFFSET, this.height / 2 - this._labelPrice.height / 2);
        this._labelCaption.position.set(SIDE_OFFSET, this.height / 2 - this._labelCaption.height / 2);
    }

    _onBuyButtonClicked() {
        this.emit(BUY_BUTTON_EVENTS.CLICKED);
    }
}
