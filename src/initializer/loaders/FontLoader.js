import {FONTS} from "../../config/resources";
import FontFaceObserver from "fontfaceobserver";

export default class FontLoader {
    load() {
        return new Promise(resolve => {
            const fonts = [];

            for (let key in FONTS) {
                fonts.push(FONTS[key]);
            }

            this.loadCss('./resources/fonts/font.css').then(loadedFont => {
                const fontLoadPromises = fonts.map(font => {
                    const fontObserver = new FontFaceObserver(font);
                    return fontObserver.load();
                });
                Promise.all(fontLoadPromises).then(resolve);
            });
        });

    }

    loadCss(url) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = url;
            link.onload = resolve;
            link.onerror = reject;
            document.getElementsByTagName('head')[0].appendChild(link);
        });
    }
}