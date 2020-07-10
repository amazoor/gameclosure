import {Text, Container} from "pixi.js";
import {FONTS} from "../../config/resources";
import {MODEL_EVENTS} from "../GameModel";
import {formatCurrency} from "../common/utils";

export class Balance extends Container {
    constructor(model) {
        super();

        this._model = model;
        this._label = new Text('', {fontSize: 28, fontFamily: FONTS.FONT_MAIN, fill: '#FFF'});
        this._model.on(MODEL_EVENTS.BALANCE_UPDATED, this.updateBalance.bind(this));

        this.addChild(this._label);
        this.updateBalance()
    }

    updateBalance() {
        const amount = this._model.getCurrentAmount()
        this._label.text = formatCurrency(amount);
    }
}
