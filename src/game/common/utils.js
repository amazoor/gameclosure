import {Graphics} from "pixi.js";

const createRoundedRectangle = (width, height, color = 0xCCCCCC) => {
    const rectangle = new Graphics();
    rectangle.beginFill(color);
    rectangle.drawRoundedRect(0, 0, width, height, 10);
    rectangle.endFill();
    return rectangle;
}

const formatCurrency = (amount, currencySign = '$', decimalCount = 2, decimal = ".", thousands = ",") => {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return currencySign + negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
}

export {createRoundedRectangle};
export {formatCurrency};
