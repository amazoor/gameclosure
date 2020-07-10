import {Container, Graphics, Text} from 'pixi.js';
import config from '../../config/app.config.json'
import {formatCurrency} from "../common/utils";
import {FONTS} from "../../config/resources";
import {BUTTON_EVENTS, SimpleButton} from "../common/SimpleButton";

export const BUY_MANAGER_DIALOG_EVENTS = {
    DISMISS: 'DISMISS',
    MANAGER_HIRED: 'MANAGER_HIRED'
};

const MARGIN = 50;

export default class BuyManagerDialog extends Container {
    constructor(model) {
        super();
        this._model = model;
        this._createComponents();
    }

    _createComponents() {
        this._buttons = [];
        this._createBackground();
        this._createListOfManagers();
        this._createCloseButton();
    }

    _createBackground() {
        const bg = new Graphics();
        bg.beginFill(0xCCCCaa);
        bg.drawRoundedRect(0, 0, config.APP_WIDTH - MARGIN, config.APP_HEIGHT - MARGIN, 20);
        bg.endFill();

        const title = new Text("Hire Manager", {fontSize: 50, fontFamily: FONTS.FONT_SECONDARY});
        bg.addChild(title);
        title.position.set(bg.width / 2 - title.width / 2, 50);
        this.addChild(bg);
    }

    _createListOfManagers() {
        const businesses = this._model.getBusinesses();
        businesses.forEach((business, index) => this._createManagerItem(business, index));
    }

    update() {
        this._buttons.forEach(({buyManagerButton}) => {
            if (buyManagerButton && buyManagerButton.parent) {
                buyManagerButton.parent.removeChild(buyManagerButton)
            }
        });
        this._createListOfManagers();
    }

    _createManagerItem(business, index) {
        const {isAvailable} = business;
        const color = isAvailable ? 0xffccff : 0xCCCCC0;
        const managerPrice = business.price * 100;
        const buttonText = business.hasManager ? `${business.title} (hired)` : `${business.title} (${formatCurrency(managerPrice)})`;
        const buyManagerButton = new SimpleButton(400, 70, buttonText, color);

        if (!isAvailable || managerPrice > this._model.getCurrentAmount() || business.hasManager) {
            buyManagerButton.disable();
        } else {
            buyManagerButton.on(BUTTON_EVENTS.CLICKED, () => this.emit(BUY_MANAGER_DIALOG_EVENTS.MANAGER_HIRED, business.itemID));
        }

        buyManagerButton.position.set(
            this.width / 2 - buyManagerButton.width / 2,
            200 + (buyManagerButton.height + 40) * index
        );

        this.addChild(buyManagerButton);
        this._buttons.push({buyManagerButton, business});
    }

    _createCloseButton() {
        const button = new SimpleButton(50, 50, 'X', 0x4287f5);
        this.addChild(button);
        button.x = this.width - button.width - 30;
        button.y = 30;
        button.on(BUTTON_EVENTS.CLICKED, () => this.emit(BUY_MANAGER_DIALOG_EVENTS.DISMISS));
    }
}