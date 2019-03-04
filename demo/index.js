/* eslint-disable import/no-extraneous-dependencies */
import { html, demo } from '@kano/demo-helpers/index.js';
import '../kwc-color-picker.js';
import { Material } from '../palettes/material.js';

const simple = html`
<kwc-color-picker></kwc-color-picker>
`;

const idle = html`
<kwc-color-picker idle></kwc-color-picker>
`;

demo('kwc-badge simple', simple);
demo('kwc-badge custom palette', simple, (element) => {
    element.colors = Material.colors;
    element.rowSize = Material.rowSize;
});
demo('kwc-badge in idle mode', idle);
