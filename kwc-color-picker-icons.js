import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<iron-iconset-svg name="kwc-color-picker" size="64">
<svg>
	<defs>
		<g id="tick">
		    <path d="M52.94,18.71,50.73,16.5a2.2,2.2,0,0,0-1-.59,2.1,2.1,0,0,0-2.19.59L25.63,38.37,16.4,29.15a2.11,2.11,0,0,0-1.6-.67,2.22,2.22,0,0,0-1.63.67L11,31.36a2.33,2.33,0,0,0,0,3.23L24,47.65l0,0a2.22,2.22,0,0,0,1.61.65,2.1,2.1,0,0,0,1.54-.62L52.94,21.94a2,2,0,0,0,.61-1A2.12,2.12,0,0,0,52.94,18.71Z"></path>
		</g>
    </defs>
</svg>
</iron-iconset-svg>`;

document.head.appendChild($_documentContainer.content);
