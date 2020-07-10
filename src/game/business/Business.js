import {Container} from "pixi.js";
import {Icon, ITEM_EVENTS} from "./Icon";
import {LoadedResources} from "../../config/resources";
import {BUY_BUTTON_EVENTS, BuyButton} from "./BuyButton";
import {Timer, TIMER_EVENT} from "./Timer";
import {PROGRESS_BAR_EVENT, ProgressBar} from "./ProgressBar";
import {MODEL_EVENTS} from "../GameModel";
import {formatCurrency} from "../common/utils";

const MARGIN = 10;

export class Business extends Container {
    constructor(businessDO, model) {
        super();

        this._model = model;
        this._businessDO = businessDO;

        this._createIcon();
        this._createBuyButton();
        this._createTimer();
        this._createProgressBar();

        this._model.on(MODEL_EVENTS.BUSINESS_UPDATED, businessDO => {
            if (this._businessDO.itemID === businessDO.itemID) {
                this._businessDO = businessDO;
                this._updateEarnings();
                this._updateBusinessesAmount();
                this._updatePrice();
            }
        });

        this._model.on(MODEL_EVENTS.MANAGER_HIRED, businessDO => {
            if (this._businessDO.itemID === businessDO.itemID) {
                this._businessDO = businessDO;
                this.produce();
            }
        });


        this._updateEarnings();
        this._updateBusinessesAmount();
        this._updatePrice();

        this._align();

        if(businessDO.hasManager) {
            this.produce();
        }
    }

    _updateEarnings() {
        this._progressBar.updateAmount(this._businessDO.businessesAmount * this._businessDO.price);
    }

    _updateBusinessesAmount() {
        this._icon.updateAmount(this._businessDO.businessesAmount);
    }

    _createIcon() {
        this._icon = new Icon({
            up: LoadedResources.images[`item_${this._businessDO.itemID}_up`].texture,
            down: LoadedResources.images[`item_${this._businessDO.itemID}_pressed`].texture,
            disabled: LoadedResources.images[`item_${this._businessDO.itemID}_disabled`].texture
        });

        this.addChild(this._icon);
        this._icon.on(ITEM_EVENTS.CLICKED, this.produce.bind(this));
    }

    _createProgressBar() {
        this._progressBar = new ProgressBar();
        this._progressBar.on(PROGRESS_BAR_EVENT.CLICKED, this.produce.bind(this));
        this.addChild(this._progressBar);
    }

    _createTimer() {
        this._timer = new Timer(this._businessDO.timeInSecondsToProduce);
        this.addChild(this._timer);
    }

    _align() {
        this._progressBar.position.set(this._icon.position.x + this._icon.width + MARGIN, 0);
        this._buyButton.position.set(
            this._icon.position.x + this._icon.width + MARGIN,
            this._icon.position.y + this._icon.height - this._buyButton.height
        );
        this._timer.position.set(
            this._buyButton.position.x + this._buyButton.width + MARGIN,
            this._buyButton.position.y
        )
    }

    _createBuyButton() {
        this._buyButton = new BuyButton();
        this._buyButton.on(BUY_BUTTON_EVENTS.CLICKED, this._buyOneMoreBusinessItem.bind(this));
        this.addChild(this._buyButton);
    }

    _updatePrice() {
        this._buyButton.setPriceLabelText(formatCurrency(this._businessDO.price));
    }

    _buyOneMoreBusinessItem() {
        this._model.buyBusinessItem(this._businessDO.itemID);
    }

    produce() {
        this._icon.disable();
        this._progressBar.disable();

        this._timer.on(TIMER_EVENT.TICK, (ms) => {
            const percentage = (this._businessDO.timeInSecondsToProduce - ms) * 100 / this._businessDO.timeInSecondsToProduce;
            this._progressBar.setProgress(percentage);
        });

        this._timer.on(TIMER_EVENT.COMPLETE, () => {
            this._timer.off(TIMER_EVENT.TICK);
            this._timer.off(TIMER_EVENT.COMPLETE);
            this._progressBar.setProgress(100);
            this._icon.enable();
            this._progressBar.enable();
            this._model.earn(this._businessDO.businessesAmount * this._businessDO.price);
            if(this._businessDO.hasManager) {
                this._businessDO.lastOperationTimeStamp = Date.now();
                this.produce();
            }
        });

        this._timer.start(this._businessDO.timeInSecondsToProduce);
    }
}
