import {Container, Sprite} from 'pixi.js';
import {LoadedResources} from "../config/resources";
import {TexturedButton} from "./common/TexturedButton";
import {GameModel} from "./GameModel";
import {Balance} from "./balance/Balance";
import {BusinessWrapper} from "./business/BusinessWrapper";
import BuyManagerDialog, {BUY_MANAGER_DIALOG_EVENTS} from "./manager/BuyManagerDialog";
import {BUTTON_EVENTS, SimpleButton} from "./common/SimpleButton";
import config from '../config/app.config.json';

export default class GameController extends Container {
    constructor() {
        super();

        this.initialize();
    }

    async initialize() {
        this._model = new GameModel();

        try {
            await this._model.initialize();
        } catch(err) {
            this._showError(err);
        }

        this._gameContainer = new Container();
        this._dialogContainer = new Container();

        this.createBackground();
        this.createBalanceField();
        this.createUserPanel();
        this.createListOfBusinesses();
        this.createDialogs();

        this.addChild(this._gameContainer);
        this.addChild(this._dialogContainer);
    }

    _showError(errorText) {
        const error = new SimpleButton(500, 300, errorText);
        error.disable();
        error.position.set(config.APP_WIDTH / 2 - error.width / 2, config.APP_HEIGHT / 2 - error.height / 2);
        this.addChild(error);
    }

    createListOfBusinesses() {
        const businesses = this._model.getBusinesses();

        businesses.forEach((business, index) => {
            const item = new BusinessWrapper(business, this._model);
            item.position.set(500, 200 * index + 150);
            this._gameContainer.addChild(item);
        });
    }

    createUserPanel() {
        const userpic = new Sprite(LoadedResources.images.userpic.texture);

        userpic.anchor.set(.5);
        userpic.position.set(260, 120);

        const buttonManager = new TexturedButton({
            up: LoadedResources.images.button_manager_up.texture,
            down: LoadedResources.images.button_manager_down.texture,
            disabled: LoadedResources.images.button_manager_disabled.texture
        }, "Hire Manager");

        buttonManager.on(BUTTON_EVENTS.CLICKED, () => this.showBuyManagerDialog());
        buttonManager.position.set(170, 290);

        this._gameContainer.addChild(userpic);
        this._gameContainer.addChild(buttonManager);
    }

    createBalanceField() {
        this._balance = new Balance(this._model);
        this._gameContainer.addChild(this._balance);
        this._balance.position.set(550, 70);
    }

    createBackground() {
        const background = new Sprite(LoadedResources.images.bg.texture);
        this._gameContainer.addChild(background);
    }

    createDialogs() {
        this._buyManagerDialog = new BuyManagerDialog(this._model);
        this._dialogContainer.addChild(this._buyManagerDialog);

        this._buyManagerDialog.position.set(
            this._gameContainer.width / 2 - this._buyManagerDialog.width / 2,
            this._gameContainer.height / 2 - this._buyManagerDialog.height / 2
        );

        this._buyManagerDialog.visible = false;
        this._buyManagerDialog.on(BUY_MANAGER_DIALOG_EVENTS.DISMISS, this.hideBuyManagerDialog.bind(this));
        this._buyManagerDialog.on(BUY_MANAGER_DIALOG_EVENTS.MANAGER_HIRED, (businessID) => {
            this.hideBuyManagerDialog();
            this._model.hireManager(businessID);
        });
    }

    showBuyManagerDialog() {
        this._buyManagerDialog.update()
        this._buyManagerDialog.visible = true;
        this._gameContainer.interactiveChildren = false;
    }

    hideBuyManagerDialog() {
        this._buyManagerDialog.visible = false;
        this._gameContainer.interactiveChildren = true;
    }
}
