import {Container} from "pixi.js";
import {ITEM_PREVIEW_EVENTS, BusinessPreview} from "./BusinessPreview";
import {Business} from "./Business";


export class BusinessWrapper extends Container {
    constructor(businessDO, model) {
        super();

        this._model = model;
        this._businessDO = businessDO;
        this._price =  businessDO.price;
        this._preview = new BusinessPreview(businessDO.title, businessDO.price);
        this._business = new Business(businessDO, model);
        const {isAvailable} = businessDO;
        this.setAvailability(isAvailable);
        this.addChild(this._preview);
        this.addChild(this._business);
    }

    buyBusiness() {
        if(this._price <= this._model.getCurrentAmount()) {
            this.setAvailability(true);
        }
    }

    setAvailability(value) {
        this._preview.visible = false;
        this._business.visible = false;
        this._businessDO.isAvailable = value;
        if (value) {
            this._business.visible = true;
            this._preview.off(ITEM_PREVIEW_EVENTS.BUY_BUSINESS);
        } else {
            this._preview.visible = true;
            this._preview.on(ITEM_PREVIEW_EVENTS.BUY_BUSINESS, this.buyBusiness.bind(this));
        }

    }
}
