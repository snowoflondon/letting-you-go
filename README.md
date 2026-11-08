# letting-you-go

A lightwseven, mobile-first web app for expressing and releasing one worry at a time.

Write a worry, hold a balloon, and let it go when ready. Follow the balloon through three locations around the world during a roughly 35-second journey. At its destination, the balloon gently fades into the sky.

The experience should feel quiet, warm, and unhurried. Animation stays gentle, with slow landscape motion during transit and a static alternative for reduced-motion users.

## Project status and scope

The active POC targets a **web browser using plain HTML, CSS, and JavaScript**, with local SVG illustrations. No frontend framework, backend, package installation, or build system is required. Design for a portrait mobile viewport first, while keeping desktop browsers usable.

The first working web draft is implemented. Existing Swift/Xcode sources belong to an earlier exploration and are not required to run it.

Phase 1 will deliver the complete interactive wireframe using simple shapes, placeholder landmark art, and the approved messages before visual polish. See [design-principles.md](design-principles.md) for the artistic direction.

The explicit state flow remains:

`write → ready → holding → journey → dissolving → complete`

## Run locally

The entry point is `index.html`, with `styles.css` and JavaScript modules in `js/`. All artwork is inline SVG; there are no remote assets or fonts. Serve the repository from a terminal in this folder:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then visit **http://localhost:8000**. Stop the server with **Ctrl+C**. Refresh the page after editing files. Use browser developer tools to review a portrait mobile viewport, and test real mobile browsers when available. Xcode and iOS Simulator are not required for the web POC.

## Logic checks

With the local server running, open **http://localhost:8000/tests/runner.html**. This checks state transitions, emoji limits, random selection, message substitution, timing boundaries, and memory cleanup. Pointer delivery, visibility events, accessibility, and visual layout still need the browser walkthrough below.

## Source layout

- `index.html`: semantic page, controls, and balloon/arm SVG.
- `styles.css`: portrait layout, palette, focus states, and gentle transitions.
- `js/state.js`: content and memory-only state machine.
- `js/scenes.js`: local SVG transit landscapes and simplified landmark illustrations.
- `js/app.js`: rendering, pointer/keyboard controls, active-time clock, and cleanup.
- `tests/runner.html`: browser-based logic checks.

## Browser acceptance walkthrough

- Try whitespace-only input, paste more than 200 characters, and include emoji.
- Continue, return to edit, and verify the full worry remains on the balloon through travel and fades with it at the end.
- Check the smaller balloon body, longer string, and first-person arm and hand before release.
- Press and immediately release the hold button; no minimum duration is required.
- Release outside the control, interrupt the pointer, or switch tabs while holding; the journey must not start.
- Check the equivalent keyboard and screen-reader release controls.
- Follow landmark reveals near 5, 15, and 25 active seconds. Each destination image and its message stay together for five seconds. Transit scenery and the fixed transit message replace them together between stops.
- At about 25 seconds, confirm the final destination and reflection appear. Hold for five seconds, then fade the balloon over five seconds. At about 35 seconds, enter complete and clear the worry.
- Hide the tab during the journey or dissolution, wait, and return; hidden time must not advance the experience.
- End a journey or start another; verify the writing field is empty.
- Reload the page; verify no session or worry is restored.
- Review narrow portrait viewports, browser zoom, screen readers, and the mobile keyboard.
- After loading, disconnect the network and confirm the experience still completes.

## Experience

### 1. Write a worry

Landing subtitle: **Your worries will float away.** Use a visually hidden accessible label for the text field; omit the visible label above it.

Show a balloon, a text field, and the prompt:

> What will you let go?

- Support one worry per journey.
- Enforce a hard limit of 200 user-perceived characters, including pasted input.
- Enable **Continue** only when the input contains non-whitespace text.
- Show the writing on the balloon during this step, with readable wrapping.
- Keep the full worry visible on the balloon through holding and the entire journey. Fade the text and balloon together during final dissolution.

### 2. Hold and release

Show a first-person illustration of an outstretched arm entering from the lower edge of the scene, with a hand holding the balloon string. Keep the balloon body small relative to the long visible string. Include a prominent button:

> Hold your balloon

While the user presses the button, give a subtle visual response and display:

> When you’re ready, let go.

- Releasing the hold button with a finger, mouse, or trackpad starts the journey. Support an equivalent keyboard interaction.
- On release, gently crossfade the arm and hand away while keeping the balloon and string visually continuous into the journey.
- There is no minimum hold duration, countdown, or reward for holding longer.
- Before release, the user can return to edit their worry.
- A cancelled touch or system interruption must not release the balloon.
- Hiding the tab, losing window focus, or receiving a pointer cancellation during a press cancels the press and returns to the ready state.
- Releasing outside the hold control cancels the press rather than starting the journey.
- Provide an equivalent accessible release interaction for users of assistive technology.
- Prevent duplicate releases.

### 3. Follow the journey

At release, select three distinct location records, two different passing message templates, and one final message template. The third location is the destination.

| Active elapsed time | Event |
| --- | --- |
| 0–5 seconds | Transit toward the first location. |
| 5–10 seconds | Hold the first location and passing message. |
| 10–15 seconds | Transit toward the second location. |
| 15–20 seconds | Hold the second location and passing message. |
| 20–25 seconds | Transit toward the final destination. |
| 25–30 seconds | Hold the final destination and reflection. |
| 30–35 seconds | Gently dissolve the balloon over five seconds. |
| After 35 seconds | Clear the worry; fade to the persistent “What will you let go of next?” prompt. |

Location reveals and transitions fit within the approximately 35-second journey. The closing screen has no time limit.

Use generic transit scenes between destination reveals: a small balloon above a horizontal city, mountain, sea, forest, or desert landscape with a few clouds. Use recognizable landmark illustrations or silhouettes for destinations. Geographic accuracy and live maps are unnecessary. This is a private, symbolic journey; other people do not receive or read the balloon.

**Interruption behavior:** Pause active elapsed time while the document is hidden and resume when it is visible again. A page reload, closed tab, or browser restart discards the session; the next visit starts with an empty writing screen.

### 4. Close the journey

At the destination, gently fade the balloon into the sky. A soft dissolve or a few nearly stationary points of light may be used. Avoid a popping sound, sudden flash, or particle burst.

Clear the worry from active app state when the balloon finishes dissolving. Keep the selected final reflection visible while the balloon is intact and dissolving. Once dissolution finishes, fade that text out and fade in **“What will you let go of next?”**, which remains until the user chooses to leave. Offer an optional **Release another worry** button that starts a fresh session with an empty field.

## Visual and accessibility direction

- Omit the eyebrow header above the main heading.
- Separate message sentences with a blank line; preserve the exact wording and punctuation.

- Design a **mobile-first, portrait-oriented** interface. On desktop, centre a narrow portrait column rather than stretching the scene across the screen.
- Keep landscape browser windows usable through scrolling; do not require device rotation or an orientation lock.
- Use a smaller balloon body and a substantially longer visible string. Before release, show the first-person outstretched arm and hand holding that string.

- Balloon colours are limited to **red, blue, or green**. For the wireframe, choose the colour using the writing-screen picker.
- Keep the selected balloon colour consistent throughout a journey.
- Keep motion slow and steady; disable transit scrolling when the browser requests reduced motion.
- Keep the balloon stable. Move transit landscapes and clouds slowly left to right at the same rate; hold destination scenes still and use gentle crossfades.
- Avoid camera pans, bouncing, continuous cloud scrolling, and large or rapid movement.
- Use readable text, sufficient contrast, accessible control labels, and support for larger text settings.
- Do not rely on colour alone to communicate state.

## Bundled content

Ship locations, messages, SVG illustrations, styles, and scripts with the web app. Once loaded, the experience must run without network requests. Offline first visits and offline reloads are outside the initial POC; those would require a separate caching strategy.

### Locations

Store each landmark and city together as one record. Select three distinct records per journey.

| Landmark | City |
| --- | --- |
| Eiffel Tower | Paris |
| Tower Bridge | London |
| Statue of Liberty | New York City |
| Tokyo Tower | Tokyo |
| Sydney Opera House | Sydney |
| Colosseum | Rome |
| Golden Gate Bridge | San Francisco |

### Transit messages and landscapes

Use these exact messages in order:

1. Initial travel: “Your worries are floating away, somewhere in the sky.”
2. After the first destination: “Your worries travel even farther, farther away.”
3. After the second destination: “With the wind, your worries drift away.”

At release, randomly select three distinct generic landscapes from **city, mountains, snowy mountains, sea, forest, and desert with pyramids**. Use one per transit segment; no transit background repeats within a journey. Keep that selection fixed throughout the journey.

Each destination image and its passing message remain paired for a full five-second stop. Transit imagery and its matching transit message replace them together.

### Passing messages

Select two different templates per journey. Preserve the wording exactly, substituting only `{landmark}` and `{city}` where present.

> Your balloon floats past the {landmark} in {city}. Your worry has traveled so far away.

> Above the {landmark} in {city}, your balloon keeps moving. In this moment, the world feels so small.

> Your balloon passes the {landmark} in {city}. Where will life take you?

### Final reflections

Select one template per journey. Preserve the wording exactly, substituting only `{landmark}` and `{city}` where present.

> Your balloon comes to rest near the {landmark} in {city}, then fades into the sky. The brisk air fills the space it left behind.

## Privacy and state

- Keep worry text in JavaScript memory and the active input element only.
- Never place worry text in URLs, query parameters, browser history state, or HTML attributes.
- Do not use localStorage, sessionStorage, IndexedDB, cookies, or form submission to retain worry text.
- Do not write worry text to local storage, files, logs, analytics, crash reports, or a backend.
- Do not send worry text over the network.
- Clear worry text from JavaScript state, input values, and rendered content when the balloon dissolves or the journey is abandoned.
- Keep final reflection data separate from worry text so the closing screen remains available after cleanup.
- Starting another journey creates a fresh session.

The POC needs no accounts, backend, social features, or saved worry history.

## Implementation plan

1. Create the web shell with semantic HTML, mobile-first CSS, and plain JavaScript. No framework or build pipeline is required.
2. Define the state flow: **write → ready → holding → journey → dissolving → complete**.
3. Add bundled location records, exact message templates, and selection logic.
4. Build writing, input validation, and editing behavior.
5. Implement touch, mouse, trackpad, and keyboard holding and release, including pointer cancellation, focus loss, and visibility handling.
6. Build one monotonic elapsed-time controller for the reduced-motion journey; exclude hidden-tab time and pause dissolution consistently.
7. Add final dissolution, memory cleanup, and restart behavior.
8. Add local SVG artwork, the smaller balloon proportions, the first-person holding view, and the muted palette; refine browser accessibility and readability.
9. Validate the complete experience in mobile browsers and desktop browsers at portrait viewport sizes.

## Validation priorities

- Enforce the 200-character limit for typing, pasted text, and emoji.
- Reject empty or whitespace-only input.
- Show the worry on the balloon during writing, holding, and travel; fade the words with the balloon and clear them at completion.
- Select three distinct locations and two different passing templates.
- Preserve exact message wording and substitute placeholders correctly.
- Distinguish intentional release from cancellation and prevent duplicate journeys.
- Verify reveals near 5, 15, and 25 seconds of active journey time.
- Verify tab visibility, focus loss during holding, pointer cancellation, page reload, abandonment, and restart behavior.
- Confirm worry text is cleared and never persisted or transmitted.
- Review every location and message on small portrait screens, with browser text enlargement and zoom, and with the on-screen keyboard open.
- Check that the first-person hand visibly grips the string and disappears gently after release.
- Check that the balloon body is smaller and the string reads clearly at mobile sizes.
- Verify accessible controls and consistently reduced motion.
- Confirm the loaded experience completes without further network requests.

## Outside POC scope

Native iOS development, App Store distribution, live maps, accurate geographic routes, accounts, social sharing, notifications, saved worries, journey history, service workers, and installable-PWA packaging.

## Future outlook

A native iOS app may be considered after the web POC validates the interaction and visual direction. It is not an active deliverable. The existing Swift/Xcode files are earlier exploratory work and are not the source of truth for the web implementation.

## Draft verification

Automated JavaScript logic checks passed. The JavaScript modules loaded successfully, HTML element references were checked, and the local server returned HTTP 200. Browser automation was unavailable, so visual layout, real input delivery, hidden-tab behavior, and assistive technology still require the manual walkthrough above.

## Balloon and completion behavior

The balloon body is enlarged to fit wrapped input. Keep the full worry on it for the entire journey and fade both together. During transit, clouds and landscape move at the same rate; both pause at destinations and remain static for reduced-motion users. A held button has a contrasting colour, outline, check mark, and holding label. Show the restart button only once “What will you let go of next?” has finished fading in.

## Phase titles and subtitles

| Phase | Title | Subtitle |
| --- | --- | --- |
| Write / Ready / Holding | What will you let go? | Your worries will float away. |
| Journey | A little farther away. | With the winds, among the clouds |
| Dissolving / Complete | In the sky, far away | You've let go of what you've held onto |

The post-dissolution body question remains **What will you let go of next?**

## Destination artwork preview

With the local server running, open **http://localhost:8000/artwork.html** to inspect all seven updated destination scenes directly. Both also appear in the normal randomized journey. All seven destinations now use individual illustrations with grounded settings. Artwork is defined in `js/destination-art.js` and `js/more-destination-art.js`, and selected through `js/scenes.js`.

## Balloon distance and destination review

Keep the full-size balloon before release for writing and holding. During the first five-second transit, smoothly shrink the body, string, and writing together to 58% of their holding size, centred around the balloon body. Keep this distant scale throughout all destination stops and final dissolution. For reduced-motion users, crossfade between fixed full-size and distant balloons instead of scaling.

All seven updated destination scenes are integrated into the main journey. Visit `http://localhost:8000/artwork.html` to review each scene with the same distant balloon scale used in the app.
