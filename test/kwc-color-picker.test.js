import '../kwc-color-picker.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

function listenOnce (el, event, cb) {
    let onEvent = function (e) {
        el.removeEventListener(event, onEvent);
        cb(e);
    }
    el.addEventListener(event, onEvent);
}

function dispatchEvent(node, name, detail) {
    detail = detail || {};
    var event = new Event(name, { bubbles: true });
    Object.assign(event, detail);
    node.dispatchEvent(event);
}

const basic = fixture`
<kwc-color-picker></kwc-color-picker>
`;

/* globals suite, test, assert, setup, fixture */
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
        let colors = dom(input.root).querySelectorAll('.color'),
            rnd = Math.floor(Math.random() * colors.length),
            el = colors[rnd],
            template = dom(input.root).querySelector('dom-repeat');

        dispatchEvent(el, 'click');

        assert.equal(input.value, template.itemForElement(el));
    });
    test('changing colors updates the selected color', () => {
        let colors = ['#ff0000', '#00ff00', '#0000ff'];
        input.colors = colors;
        assert.equal(input.value, colors[0]);
    });
});