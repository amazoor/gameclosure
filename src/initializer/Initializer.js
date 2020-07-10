import FontLoader from "./loaders/FontLoader";
import AssetsLoader from "./loaders/AssetsLoader";
import GameController from "../game/GameController";

export default class Initializer {
    constructor({appContainer, app}) {
        const fontLoader = new FontLoader().load();
        const assetsLoader = new AssetsLoader().load();

        const loadComplete = Promise.all([fontLoader, assetsLoader]);

        loadComplete.then(() => {
            appContainer.interactive = true;
            app.stage.addChild(appContainer);
            appContainer.addChild(new GameController());
            window.onresize();
        });
    }
}
