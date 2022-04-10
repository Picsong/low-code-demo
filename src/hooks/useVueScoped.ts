// @ts-ignore
import Sass from "sass.js"
import {Ref} from "vue";

export default function useVueScoped(id: string) {
    const templateTransform = (html: string) => {
        return html.replace(/<[^\/](.*?)>/g, v => `${v.slice(0, -1)} ${id}>`);
    };
    const createStyleToHead = (scss: string, oldIdRef: Ref) => {
        Sass.compile(scss, ({text}: { text: string }) => {
            const style = document.createElement('style');
            style.id = id
            style.type = 'text/css';
            style.innerHTML = text.replace(/\s{/g, `[${id}]{`);
            document.head.appendChild(style);
            if (oldIdRef.value) {
                const oldStyle = document.getElementById(oldIdRef.value);
                if (oldStyle) {
                    oldStyle.remove();
                }
            }
            oldIdRef.value = id;
        })
    };
    return {
        templateTransform,
        createStyleToHead
    }
}
