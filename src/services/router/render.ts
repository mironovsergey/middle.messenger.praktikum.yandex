import Block from '../block';

const renderDOM = (selector: string, block: Block): HTMLElement => {
    const root: HTMLElement | null = document.querySelector(selector);

    if (!root) {
        throw new Error('Элемент не найден');
    }

    root.replaceChildren(block.getElement());

    block.dispatchComponentDidMount();

    return root;
};

export default renderDOM;
