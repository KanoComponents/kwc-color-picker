import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { fixture, assert } from '@kano/web-tester/helpers.js';
import './kwc-color-picker.js';

function listenOnce(el, event, cb) {
    const onEvent = function onEvent(e) {
        el.removeEventListener(event, onEvent);
        cb(e);
    };
    el.addEventListener(event, onEvent);
}

function dispatchEvent(node, name, detail) {
    detail = detail || {};
    const event = new Event(name, { bubbles: true });
    Object.assign(event, detail);
    node.dispatchEvent(event);
}

const basic = fixture`
<kwc-color-picker></kwc-color-picker>
`;

/* globals suite, test, setup */
suite('<kano-input-color>', () => {
    let input;
    setup((done) => {
        input = basic();
        listenOnce(input, 'dom-change', () => {
            done();
        });
    });
    test('is white by default', () => {
        assert.isTrue(input.value === '#ffffff');
    });
    test('changes value on click', () => {
        const colors = dom(input.root).querySelectorAll('.color');
        const rnd = Math.floor(Math.random() * colors.length);
        const el = colors[rnd];
        const template = dom(input.root).querySelector('dom-repeat');

        dispatchEvent(el, 'click');

        assert.equal(input.value, template.itemForElement(el));
    });
    test('changing colors updates the selected color', () => {
        const colors = ['#ff0000', '#00ff00', '#0000ff'];
        input.colors = colors;
        assert.equal(input.value, colors[0]);
    });
});
