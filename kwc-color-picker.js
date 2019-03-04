import '@polymer/polymer/polymer-legacy.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { flush as flush$0, dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-icon/iron-icon.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import './kwc-color-picker-icons.js';

/**
`kano-input-color` Displays a color palette and allows one to be selected with a click

Example:

    <kano-input-color value="{{value}}"></kano-input-color>

### Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--kwc-color-picker-size` | Size of a single color field | 29px
`--kwc-color-picker-margin` | Size of margin around a color field | 2px
`--kwc-color-picker-background` | Background color on host | 'transparent'
`--kwc-color-picker-field` | Mixin for the input field | {}
`--kwc-color-picker-outline` | Mixin applied to the selection frame | {}
`--kwc-color-picker-outline-hover-light` |
    Mixin applied to the selection frame when over a light color | {}
`--kwc-color-picker-outline-hover-dark` |
    Mixin applied to the selection frame when over a dark color | {}

@group Kano Elements
@hero hero.svg
@demo demo/index.html
*/
Polymer({
    _template: html`
        <style>
            :host {
                display: inline-block;
                /*1px padding ensures select-frame is not cropped regardless of overflow*/
                padding: 1px;
            }

            #colors {
                @apply --layout-horizontal;
                @apply --layout-wrap;
                position: relative;
                cursor: pointer;
                @apply --kwc-color-picker-field;
            }

            #select-frame {
                @apply --layout-horizontal;
                @apply --layout-center-justified;
                @apply --layout-center;
                position: absolute;
                top: calc(var(--kwc-color-picker-margin, 0) * -1);
                left: calc(var(--kwc-color-picker-margin, 0) * -1);
                width: var(--kwc-color-picker-size, 22px);
                height: var(--kwc-color-picker-size, 22px);
                outline: 3px solid #aaa;
                outline-offset: -1px;
                margin: var(--kwc-color-picker-margin, 0);
                @apply --kwc-color-picker-outline;
            }

            #tick {
                opacity: 0;
                transition: opacity 100ms linear;
            }

            #tick.visible {
                opacity: 1;
            }

            .color {
                width: var(--kwc-color-picker-size, 22px);
                height: var(--kwc-color-picker-size, 22px);
                margin: var(--kwc-color-picker-margin, 0);
                transition: transform 150ms;
                outline-offset: -1px;
                box-sizing: border-box;
                border: 0px;
                cursor: pointer;
                border-radius: 0;
            }

            .color:focus {
                outline: none;
            }

            .color.hover-dark,
            #select-frame.hover-dark {
                outline: 3px solid #fff;
                @apply --kwc-color-picker-outline-hover-dark;
            }

            .color.hover-light,
            #select-frame.hover-light {
                outline: 3px solid #aaa;
                @apply --kwc-color-picker-outline-hover-light;
            }

            .color.hover-light,
            .color.hover-dark {
                z-index: 1;
            }

            iron-icon {
                --iron-icon-height: calc(var(--kwc-color-picker-size, 22px) / 1.5);
                --iron-icon-width: calc(var(--kwc-color-picker-size, 22px) / 1.5);
                fill: #fff;
            }
            #select-frame.hover-dark iron-icon {
                fill: #fff;
                @apply --kwc-color-picker-outline-hover-dark;
            }
            #select-frame.hover-light iron-icon {
                fill: #aaa;
                @apply --kwc-color-picker-outline-hover-light;
            }

            [hidden] {
                display: none !important;
            }
        </style>
        <div id="colors" data-animate="450">
            <template id="palette" is="dom-repeat" items="{{colors}}" as="color">
                <button id\$="color-[[index]]" class="color" style\$="[[_computeColor(color)]]" on-tap="_selectColorOnTap" on-mouseenter="_hoverOn" on-mouseleave="_hoverOff"></button>
            </template>
            <div id="select-frame" hidden\$="[[_hideSelectFrame(colors.*, idle, firstHighlight)]]">
                <iron-icon id="tick" icon="[[tickIcon]]"></iron-icon>
            </div>
        </div>
`,

    is: 'kwc-color-picker',

    behaviors: [
        IronResizableBehavior,
    ],

    properties: {
        colors: {
            type: Array,
            value: () => [
                '#ffffff', // White
                '#000000', // Black
                '#e95c5a', // Red
                '#ff842a', // Kano Orange
                '#f8eb1e', // Yellow
                '#3caa36', // Green
                '#0e6633', // Dark Green
                '#59b3d0', // Light Blue
                '#2a3080', // Dark Blue
                '#642682', // Violet
                '#db7d92', // Pink
                '#683d12', // Brown
            ],
            observer: '_onColorsSet',
        },
        value: {
            type: String,
            notify: true,
            observer: '_onValueChanged',
        },
        rowSize: {
            type: Number,
            value: 12,
        },
        selectedIndex: {
            type: Number,
            observer: '_highlightSelected',
        },
        idle: {
            type: Boolean,
            value: false,
            observer: '_onIdleChanged',
        },
        visible: {
            type: Boolean,
            value: false,
        },
        tickIcon: {
            type: String,
            value: () => 'kwc-color-picker:tick',
        },
    },

    observers: [
        '_setSize(rowSize, isAttached)',
    ],

    listeners: {
        'iron-resize': '_onResize',
    },

    // Forces the dom-repeat to stamp right now
    // Useful if parent needs to compute size after connected
    flush() {
        flush$0();
    },

    _setSize(rowSize, isAttached) {
        if (!isAttached) {
            return;
        }
        const colorSize = this.getComputedStyleValue('--kwc-color-picker-size') || '22px';
        const margin = this.getComputedStyleValue('--kwc-color-picker-margin') || '0';
        this.$.colors.style.width = `${(parseFloat(colorSize, 10) + (2 * (parseFloat(margin, 10)))) * this.rowSize}px`;
    },

    addColor(color) {
        if (this._isHex(color)) {
            this.splice('colors', this.colors.length, 0, color);
        }
    },

    removeColor(index) {
        this.splice('colors', index, 1);
    },

    _hoverOn(e) {
        const target = dom(e).rootTarget;
        const color = this.$.palette.modelForElement(target).get('color');
        const index = this.$.palette.indexForElement(target);
        const brightness = this.getBrightness(color);
        const highlightClass = brightness > 210 ? 'hover-light' : 'hover-dark';

        if (index !== this.selectedIndex) {
            this.toggleClass(highlightClass, true, target);
        }
    },

    _hoverOff(e) {
        const target = dom(e).rootTarget;
        const hoverClass = /hover-dark|hover-light/.exec(target.classList);
        this.toggleClass(hoverClass, false, target);
    },

    _selectColorOnTap(e) {
        this.selectColor(e.model.index);
    },

    selectColor(index) {
        this.set('value', this.colors[index]);
        this.fire('change', this.value);
    },

    _highlightSelected() {
        const target = this.$$(`#color-${this.selectedIndex}`);
        if (!target || !this.visible) {
            return;
        }
        const brightness = this.getBrightness(this.colors[this.selectedIndex]);
        const frame = this.$['select-frame'];
        const currentFrameOffset = {
            top: frame.getBoundingClientRect().top -
              this.$.colors.getBoundingClientRect().top,
            left: frame.getBoundingClientRect().left -
              this.$.colors.getBoundingClientRect().left,
        };
        this.toggleClass(brightness > 210 ? 'hover-dark' : 'hover-light', false, frame);
        this.toggleClass(brightness > 210 ? 'hover-light' : 'hover-dark', true, frame);

        // Animate if the frame is visible and animation is supported
        if (!this.idle && this.firstHighlight && 'animate' in HTMLElement.prototype) {
            frame.animate({
                transform: [
                    `translate(${currentFrameOffset.left}px, ${currentFrameOffset.top}px)`,
                    `translate(${target.offsetLeft}px, ${target.offsetTop}px)`,
                ],
            }, {
                duration: 200,
                easing: 'ease-out',
                fill: 'forwards',
            });

            // Otherwise use the new position immediately
        } else {
            frame.style.transform = `translate(${target.offsetLeft}px, ${target.offsetTop}px)`;
            this.toggleClass('visible', true, this.$.tick);
            this.firstHighlight = true;
        }
    },

    _computeColor(color) {
        return `background-color: ${color};`;
    },

    _hideSelectFrame() {
        return !this.colors || !this.colors.length || !this.firstHighlight || this.idle;
    },

    getIndexByValue(value) {
        if (!value) {
            return -1;
        }
        const normalizedValue = this.normalizeHex(value);
        return this.colors.findIndex(c => this.normalizeHex(c) === normalizedValue);
    },

    normalizeHex(hex) {
        let expanded = hex;
        if (hex.length === 4) {
            expanded = `#${hex.charAt(1)}${hex.charAt(1)}${hex.charAt(2)}${hex.charAt(2)}${hex.charAt(3)}${hex.charAt(3)}`;
        }
        return expanded.toLowerCase();
    },

    getBrightness(hexCode) {
        hexCode = hexCode.replace('#', '');
        const r = parseInt(hexCode.substr(0, 2), 16);
        const g = parseInt(hexCode.substr(2, 2), 16);
        const b = parseInt(hexCode.substr(4, 2), 16);
        return ((r * 299) + (g * 587) + (b * 114)) / 1000;
    },

    _isHex(value) {
        return /^#[0-9A-F]{3,6}$/i.test(value);
    },

    _onValueChanged(value) {
        if (this._isHex(value)) {
            this.selectedIndex = Math.max(0, this.getIndexByValue(value));
        }
    },

    _onColorsSet() {
        // Colors are set/reset. Find the value's index in the new array.
        const newIndex = this.getIndexByValue(this.value);
        if (newIndex === -1) {
            this.selectColor(0);
        } else if (newIndex !== this.selectedIndex) {
            this.selectColor(newIndex);
        }
    },

    _onIdleChanged(idle) {
        if (idle) {
            this.firstHighlight = false;
            this.selectedIndex = null;
            this.value = null;
        }
    },

    _onResize() {
        // Iron-resize will call this function on resize,
        // including when element has become hidden/unhidden.
        // We delay the clientRect reading as the css values will be applied in the next cycle.
        afterNextRender(this, () => {
            this.resize();
        });
    },

    resize() {
        this.visible = this.getBoundingClientRect().width !== 0 &&
          this.getBoundingClientRect().height !== 0;
        if (this.visible && !this.idle) {
            this._highlightSelected();
        } else {
            this.firstHighlight = false;
        }
    },

    // Returns the color palette for outside access
    getColorField() {
        return this.$.colors;
    },
});
