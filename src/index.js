import {Application, Container} from 'pixi.js';

import appConfig from "./config/app.config";
import Initializer from './initializer/Initializer';

const app = new Application({
    width: appConfig.APP_WIDTH,
    height: appConfig.APP_HEIGHT,
    antialias: true,
    backgroundColor: 0x000000
});

const appContainer = new Container();

const resizeHandler = () => {
    const scaleFactor = Math.min(window.innerWidth / appConfig.APP_WIDTH, window.innerHeight / appConfig.APP_HEIGHT);
    const newWidth = Math.ceil(appConfig.APP_WIDTH * scaleFactor);
    const newHeight = Math.ceil(appConfig.APP_HEIGHT * scaleFactor);

    if (newWidth < appConfig.APP_WIDTH || newWidth < appConfig.APP_HEIGHT) {
        app.renderer.view.style.width = `${newWidth}px`;
        app.renderer.view.style.height = `${newHeight}px`;
        app.renderer.resize(newWidth, newHeight);
        appContainer.scale.set(scaleFactor);
    }
};

new Initializer({appContainer, app});

document.getElementById('app').appendChild(app.view);

window.onresize = resizeHandler.bind(this);
