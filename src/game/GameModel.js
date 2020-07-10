import {utils} from "pixi.js";
import {SessionManager} from "./model/SessionManager";
import {ServerManager} from "./model/ServerManager";

export const MODEL_EVENTS = {
    BALANCE_UPDATED: 'BALANCE_UPDATED',
    BUSINESS_UPDATED: 'BUSINESS_UPDATED',
    MANAGER_HIRED: 'MANAGER_HIRED',
};

export class GameModel extends utils.EventEmitter {
    async initialize() {
        const previousSession = this.getSavedState();
        let data;

        if (previousSession) {
            data = this.extractData(previousSession);
        } else {
            data = await this.getDataFromServer();
        }

        this.businessesList = data.businesses;
        this.userBalance = parseInt(data.user.balance);
        this.userBalance += this._countOfflineEarnings();
    }

    _countOfflineEarnings() {
        const currentTimestamp = Date.now();
        const automatedBusinesses = this.businessesList.filter(business => business.hasManager);
        const sums = automatedBusinesses.map(business => {
            const delta = currentTimestamp - business.lastOperationTimeStamp;
            const secondsPassed = Math.floor(delta / 1000);
            return (business.price * business.businessesAmount) * secondsPassed;
        });

        return sums.reduce((total, currentEarning) => total + currentEarning);
    }

    saveState() {
        const user = {balance: this.userBalance};
        const businesses = this.businessesList;
        const data = JSON.stringify({user, businesses});
        SessionManager.saveState(data);
    }

    getSavedState() {
        return SessionManager.getState();
    }

    extractData(session) {
        return JSON.parse(session);
    }

    async getDataFromServer() {
        return await ServerManager.sendInitRequest();
    }

    getBusinesses() {
        return this.businessesList;
    }

    buyBusinessItem(id) {
        let businessDO = this.businessesList.find(business => business.itemID === id);
        if (businessDO && this.userBalance >= businessDO.price) {
            businessDO.businessesAmount += 1;
            this.spend(businessDO.price);
            this.emit(MODEL_EVENTS.BUSINESS_UPDATED, businessDO);
            this.saveState();
        }
    }

    hireManager(id) {
        let businessDO = this.businessesList.find(business => business.itemID === id);
        if (businessDO && this.userBalance >= businessDO.price * 100) {
            businessDO.hasManager = true;
            this.spend(businessDO.price * 100);
            this.emit(MODEL_EVENTS.MANAGER_HIRED, businessDO);
            this.saveState();
        }
    }

    earn(amount) {
        this.userBalance += amount;
        this.emit(MODEL_EVENTS.BALANCE_UPDATED);
        this.saveState();
    }

    spend(amount) {
        this.userBalance -= amount;
        this.emit(MODEL_EVENTS.BALANCE_UPDATED);
        this.saveState();
    }

    getCurrentAmount() {
        return this.userBalance;
    }
}

export class BusinessDO {
    constructor(config) {
        this.itemID = config.id;
        this.isAvailable = config.isAvailable;
        this.title = config.title;
        this.timeInSecondsToProduce = config.timeToProduce;
        this.hasManager = config.hasManager;
        this.price = config.price;
        this.businessesAmount = 1;
    }
}