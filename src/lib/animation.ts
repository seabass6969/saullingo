import { elasticOut } from 'svelte/easing';
export function spin(node, { duration }) {
    return {
        duration,
        css: t => {
            const eased = elasticOut(t);

            return `
                transform:  translateX(${Math.sin(eased*100)*10}px);
                `
        }
    };
}
export function dropDown(node, { duration }) {
    return {
        duration,
        css: t => {
            const eased = elasticOut(t);
            return `transform: translateY(${eased*50}px)`
        }
    };
}