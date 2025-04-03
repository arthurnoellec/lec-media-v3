import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_DPxE-U5J.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/ab-testing-ecommerce.astro.mjs');
const _page1 = () => import('./pages/agence-cro.astro.mjs');
const _page2 = () => import('./pages/agence-ui-ux.astro.mjs');
const _page3 = () => import('./pages/avis-lec-media-agency-agence-cro.astro.mjs');
const _page4 = () => import('./pages/blog/_slug_.astro.mjs');
const _page5 = () => import('./pages/blog.astro.mjs');
const _page6 = () => import('./pages/creation-boutique-shopify.astro.mjs');
const _page7 = () => import('./pages/formation-intervention-entreprise-shopify.astro.mjs');
const _page8 = () => import('./pages/integration-3dvue.astro.mjs');
const _page9 = () => import('./pages/refonte-site-ecommerce.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/ab-testing-ecommerce.astro", _page0],
    ["src/pages/agence-cro.astro", _page1],
    ["src/pages/agence-ui-ux.astro", _page2],
    ["src/pages/avis-lec-media-agency-agence-cro.astro", _page3],
    ["src/pages/blog/[slug].astro", _page4],
    ["src/pages/blog/index.astro", _page5],
    ["src/pages/creation-boutique-shopify.astro", _page6],
    ["src/pages/formation-intervention-entreprise-shopify.astro", _page7],
    ["src/pages/integration-3dvue.astro", _page8],
    ["src/pages/refonte-site-ecommerce.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "aecab6d3-6fe2-4451-8c95-15061a8f0ee3"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
