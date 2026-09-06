# Study scene

## Files

- `src/components/Desk.astro`: homepage embed and keyboard-accessible pamphlet link.
- `public/window-study/component.js`: custom element shell, loading/error UI and lifecycle.
- `public/window-study/engine.js`: renderer, cameras, input, lighting and raycast navigation.
- `public/window-study/room.js`: furniture, plants, frame and scene resources.
- `public/window-study/materials.js`: procedural materials.
- `public/window-study/style.css`: isolated, minimal controls.
- `public/window-study/assets/`: garden texture and original child illustration.
- `public/window-study/vendor/`: Three.js and addons, including MIT license.

The scene is self-hosted, with no iframe, external CDN or model API. Dimensions are 560px high on desktop and 500px on mobile. The illustration is not a real family photo.

## UI contract

Keep the space itself prominent. All scene labels are short English strings. Loading says `Loading...`. Four quiet icons provide previous view, next view, reset view and night lighting. Do not add branding, descriptive overlays, counters or an information panel.

Mouse drag and arrow keys rotate the camera; plus/minus zoom. Wheel and one-finger touch scroll the page. Preset controls make the scene usable on touch devices. Night lighting dims outdoor and room illumination while enabling the warm desk lamp. Reduced motion skips camera/lighting transitions.

The standing frame beside the plant links to `/spaces/juha/index.html`. Raycasting respects nearer scene geometry, and a slightly enlarged transparent hit region makes the small frame easier to select. Movement over six pixels or pointer cancellation cancels navigation. The frame changes the mouse cursor without adding an overlay. An HTML link becomes visible on keyboard focus. This is an unobtrusive entrance, not authorization.

## Lifecycle

The element loads local CSS and the engine; disconnection disposes resources. `study-ready` is emitted after scene textures load. Failed initialization shows an English error and retry button. WebGL context restoration restarts the element. Rendering is requested on changes rather than running continuously at rest; hidden documents pause animation.

## Editing and testing

Keep vendor code separate from application changes. Preserve licenses when updating dependencies. Update engine and shell together when changing control IDs. Test actual HTTP success at the pamphlet destination, not just navigation. Check day/night, all camera presets, keyboard navigation, touch behavior, drag cancellation and no-JavaScript reading. Run visual checks on real mobile GPUs and Safari in addition to automated Chromium tests.
