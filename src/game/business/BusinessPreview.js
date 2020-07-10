import {Text, Container, Graphics} from "pixi.js";
import {FONTS} from "../../config/resources";

const TOP_MARGIN = 10;
const BOTTOM_MARGIN = 15;
const WIDTH = 450;
const HEIGHT = 70;

export const ITEM_PREVIEW_EVENTS = {
    BUY_BUSINESS: 'BUY_BUSINESS'
};

export class BusinessPreview extends Container {
    constructor(businessName, businessPrice) {
        super();

        this._bg = this._createBackground();
        this._title = this._createTitleLabel(businessName);
        this._price = this._createPriceLabel(businessPrice)

        this.addChild(this._bg);
        this.addChild(this._title);
        this.addChild(this._price);

        this._align();

        this.interactive = true;
        this.on('pointertap', this.onItemClicked.bind(this));
    }

    onItemClicked() {
        this.emit(ITEM_PREVIEW_EVENTS.BUY_BUSINESS);
    }

    _createBackground() {
        const bg = new Graphics();
        bg.beginFill(0xFF3E3E);
        bg.drawRoundedRect(0, 0, WIDTH, HEIGHT, 10);
        bg.endFill();

        return bg;
    }

    _createTitleLabel(text) {
        return new Text(text, {fontSize: 18, fontFamily: FONTS.FONT_SECONDARY, fill: '#FFF'});
    }

    _createPriceLabel(text) {
        const price = new Text(text, {fontSize: 20, fontFamily: FONTS.FONT_SECONDARY, fill: '#000'});
        price.x = this.width / 2 - price.width / 2;
        price.y = HEIGHT - price.height - BOTTOM_MARGIN;

        return price;
    }

    _align() {
        this._title.x = this._bg.width / 2 - this._title.width / 2;
        this._title.y = TOP_MARGIN;

        this._price.x = this._bg.width / 2 - this._price.width / 2;
        this._price.y = HEIGHT - this._price.height - BOTTOM_MARGIN;
    }
}
