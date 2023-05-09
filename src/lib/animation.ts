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
	export function typewriter(node, { speed = 1 }) {
	const valid = (
		node.childNodes.length === 1 &&
		node.childNodes[0].nodeType === Node.TEXT_NODE
	);

	if (!valid) {
		throw new Error(`This transition only works on elements with a single text node child`);
	}

	const text = node.textContent;
	const duration = text.length / (speed * 0.01);

	return {
		duration,
		tick: t => {
			const i = Math.trunc(text.length * t);
			node.textContent = text.slice(0, i);
		}
	};
}
// export function typewriterplaceholder(node, { speed = 1 }, textstring: string[]) {
// 	let text = textstring;
// 	let texteachLength = 0
// 	textstring.forEach((element)=> {
// 		texteachLength += element.length
// 	})
// 	const duration = texteachLength / (speed * 0.01);

// 	return {
// 		duration,
// 		tick: t => {
// 			const i = Math.trunc(text.length * t);
// 			node.placeholder = text.slice(0, i);
// 		}
// 	};
// }

export function typewriterplaceholder(node, { speed = 1}) {
	let text = node.placeholder;
	const duration = text.length / (speed * 0.01);

	return {
		duration,
		tick: t => {
			const i = Math.trunc(text.length * t);
			node.placeholder = text.slice(0, i);
		}
	};
}