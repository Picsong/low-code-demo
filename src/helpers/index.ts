// @ts-ignore
import Sass from "sass.js"

export const templateTransform = (html: string, scopedId: string) => {
    return html.replace(/<[^\/](.*?)>/g, v => `${v.slice(0, -1)} ${scopedId}>`);
};

export const createStyleToHead = (scss: string, scopedId: string) => {
    Sass.compile(scss, ({text}: { text: string }) => {
        const style = document.createElement('style');
        style.id = scopedId
        style.type = 'text/css';
        style.innerHTML = text.replace(/\s{/g, `[${scopedId}]{`);
        document.head.appendChild(style);

    })
};
