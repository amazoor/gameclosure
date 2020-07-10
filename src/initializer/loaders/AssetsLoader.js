import {images, LoadedResources} from "../../config/resources";
import {Loader} from "pixi.js";

export default class AssetsLoader {
    load() {
        return new Promise(resolve => {
            Loader.shared
                .add(images)
                .load((event) => {
                    LoadedResources.images = event.resources;
                    resolve();
                });
        })
    }
}