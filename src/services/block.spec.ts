// eslint-disable-next-line max-classes-per-file
import type BlockType from './block';
import { expect } from 'chai';
import { SinonStub, stub, spy } from 'sinon';
import { JSDOM } from 'jsdom';
import proxyquire from 'proxyquire';

const fakeEventBus = {
    on: stub(),
    emit: stub()
};

const { default: Block } = proxyquire(
    './block',
    {
        './event-bus': {
            default: class {
                on = fakeEventBus.on;
                emit = fakeEventBus.emit;
            }
        }
    }
) as { default: typeof BlockType };

describe('Block', () => {
    class FakeBlock extends Block { }

    let block: FakeBlock;
    let renderStub: SinonStub;

    before(() => {
        const { window } = new JSDOM(
            '<!doctype html><html><body><div id="root"></div></body></html>',
            {
                url: 'http://localhost'
            }
        );

        (global as any).window = window;
        (global as any).document = window.document;
        (global as any).DocumentFragment = window.DocumentFragment;
    });

    after(() => {
        (global as any).window = undefined;
        (global as any).document = undefined;
        (global as any).DocumentFragment = undefined;
    });

    beforeEach(() => {
        block = new FakeBlock({});
        renderStub = stub(block, 'render');
    });

    afterEach(() => {
        renderStub.restore();
        fakeEventBus.on.reset();
        fakeEventBus.emit.reset();
    });

    it('должен вызывать событие "init" при инициализации', () => {
        expect(fakeEventBus.emit.calledWith(Block.EVENTS.INIT)).to.eq(true);
    });

    it('должен вызывать метод render и возвращать правильное отображение', () => {
        const expectedContent = document.createDocumentFragment();
        renderStub.returns(expectedContent);

        const result = block.render();

        expect(renderStub.calledOnce).to.eq(true);
        expect(result).to.equal(expectedContent);
    });

    it('должен правильно обновлять пропсы и вызывать событие FLOW_CDU', () => {
        const setPropsSpy = spy(block, 'setProps');

        const newProps = { title: 'value' };
        block.setProps(newProps);

        expect(setPropsSpy.calledOnceWith(newProps)).to.eq(true);
        expect(fakeEventBus.emit.calledWith(Block.EVENTS.FLOW_CDU)).to.eq(true);

        setPropsSpy.restore();
    });
});
