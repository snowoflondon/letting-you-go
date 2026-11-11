# Design principles

Artistic and interaction reference for **letting-you-go**, a mobile-first HTML/CSS/JavaScript web app for a brief, private moment of release. Read alongside [README.md](README.md), which defines the flow, timing, content, and privacy requirements.

## Emotional direction

The app should feel warm, calm, soft, and spacious. Imagine a quietly illustrated travel postcard: an open sky, a small balloon, and a landscape that gives the eye somewhere to rest.

Let the user set the emotional meaning of the experience. Avoid visual pressure, celebration, urgency, or promises that a worry has been solved. The closing moment should feel like a gentle pause.

## Illustration style

Use simplified, carefully shaped illustrations with rounded edges, restrained detail, and matte colour. A subtle paper-like texture is optional, provided it remains unobtrusive at phone size.

- Build scenes from a few clear layers: sky, distant landscape, landmark or foreground, and balloon.
- Use broad shapes and soft tonal separation rather than heavy outlines or deep shadows.
- Keep lighting diffuse and consistent across scenes.
- Avoid photorealism, glossy 3D rendering, sharp neon gradients, and dense visual detail.
- Keep the same drawing language, level of detail, and palette across all destinations.

## Colour palette

Use warm neutrals as the foundation, with muted blue, sage, dusty rose, and sand accents. Colours should feel softened by daylight. Avoid oversaturated primary colours.

The following values are starting points for art direction, not verified accessible colour pairs:

| Role | Colour direction | Starting value |
| --- | --- | --- |
| Main background | Warm ivory | `#F7F2E9` |
| Surface / cloud | Soft cream | `#FFFBF4` |
| Primary text | Warm charcoal | `#393732` |
| Secondary text | Muted taupe | `#696257` |
| Sky | Pale mist blue | `#DCE7E8` |
| Distant terrain | Dusty sage | `#B6C3AF` |
| Stone / buildings | Warm sand | `#D6C5AE` |
| Water | Muted blue-grey | `#A9C1C8` |
| Red balloon | Soft terracotta red | `#BC7169` |
| Blue balloon | Dusty blue | `#7196AE` |
| Green balloon | Muted leaf green | `#819B7A` |
| Yellow balloon | Soft ochre yellow | `#D7BD76` |

Balloon colours must remain recognizably **red, blue, green, or yellow**. Use one colour consistently throughout each journey. The Phase 1 wireframe uses a writing-screen colour picker so each option can be reviewed; the final selection treatment can be refined during visual polish.

Keep landmarks and scenery quieter than the balloon. Adjust local backgrounds or add a subtle contour when needed to preserve its silhouette. Landmark colours may vary within the muted palette to retain recognizable features.

Verify text and control contrast in the implemented interface. Soft colour should not mean faint labels or hard-to-find controls.

## Composition

Design for **portrait mobile browser viewports**, with generous sky and a landscape running horizontally across the lower part of the scene. On larger screens, centre a narrow column (approximately 420–480 CSS pixels maximum width) and preserve the portrait composition.

Use responsive HTML and CSS rather than a fixed screenshot-sized canvas. Allow vertical scrolling when the viewport is short, the keyboard is open, or text is enlarged. Keep landscape windows usable without requiring rotation or a browser orientation lock. Account for mobile safe areas and changing browser toolbar height; controls must remain reachable.

- Place the balloon in the open sky, usually near the horizontal centre.
- Reserve approximately the lower quarter to third of the illustration for terrain, water, or buildings; allow tall landmarks to extend into the sky.
- Keep the horizon straight or naturally undulating, following the terrain.
- Use a flat, side-on landscape composition. Do not curve the scene around a globe or use planetary rotation.
- Include a few softly shaped clouds with ample space between them.
- Keep text in a clear, stable area, away from landmark detail and cloud edges.
- Adapt the layout to smaller screens and larger text rather than shrinking messages to fit a fixed composition.

## Balloon

The balloon is the visual thread connecting the experience. Give it a simple rounded silhouette, a small knot, and a fine, clearly visible string. A restrained highlight can add softness without making it glossy.

Use a moderately larger balloon body, approximately 26% of the scene width, while retaining the long string and generous sky. The full worry remains visible inside the balloon during writing, ready, holding, travel, and final dissolution. Wrap text and adjust its size to fit the 200-character limit; the input field remains the comfortable editing surface.

Place the writing inside the same SVG group as the balloon so both fade together over seven seconds. Clear the text at completion or abandonment.

## First-person holding view

Before release, show the scene from the user's point of view: an **outstretched arm entering from the lower edge**, ending in a hand visibly gripping the balloon string. Use this composition on the write, ready, and holding screens; keep the input and controls outside the illustration so they remain accessible.

- Show the forearm and hand from the holder's perspective, rather than a full person viewed from outside.
- Extend the arm naturally toward the sky, with the string visibly meeting the gripping fingers.
- Keep anatomy simplified and soft, consistent with the illustration style. A neutral sleeve can reduce detail; use a considered skin tone for the visible hand.
- Keep the balloon above the hand, with enough exposed string to communicate the connection.
- Keep arm, string, balloon, and controls separate so the scene can adapt to narrow screens without overlap.
- During holding, use a subtle shading or emphasis change to acknowledge contact. Avoid pulsing, bouncing, or a visual countdown.
- On release, gently crossfade the arm and hand away, retaining the balloon and string as the visual link into the journey. Do not add an abrupt arm movement, camera shift, or large balloon jump.
- A cancelled hold retains the first-person holding scene and returns the control to its ready state.

The illustration communicates holding; the actual interaction remains an accessible HTML control with touch, pointer, and keyboard support.

## Transit scenes

Use a reusable generic transit scene between location reveals. It shows the balloon floating above a horizontal landscape with a few clouds in the sky.

Prepare a small family of matching landscapes:

| Variant | Visual elements |
| --- | --- |
| City | Low, simplified building silhouettes and a quiet skyline |
| Mountains | Broad overlapping ridgelines with soft tonal depth |
| Sea | A level horizon and broad, restrained bands of water |
| Snowy mountains | Muted blue-grey ridgelines with soft ivory snow caps |
| Forest | Layered, softly shaped trees in muted greens |
| Desert | Warm sand dunes and recognizable pyramid silhouettes |

Select three distinct transit landscapes randomly at release from mountains, snowy mountains, sea, forest, desert with pyramids, wheat field with one red tractor, icy sea, and autumn forest. Never repeat a transit background within a journey. Use these messages in order: “Your worries are floating away, somewhere in the sky.”; “Your worries travel even farther, farther away.”; “With the wind, your worries drift away.” Keep each destination image and its destination message together for the full seven-second stop; switch both to transit together afterward.

Transit scenery should feel anonymous and spacious. It does not need to depict a real route or suggest geographic accuracy. Keep the balloon's position and scale consistent when switching between transit and destination scenes.

**Floating combines composition with restrained landscape movement:** the balloon hangs in open sky while transit scenery moves slowly from left to right. Use a 36.96-unit drift across each seven-second segment within the 400-unit SVG viewBox, with neighbouring landscape tiles covering the edges. Drive movement from active journey time so hidden tabs pause it. Keep destination scenes still, and disable the drift when reduced motion is requested.

## Destination scenes

Each selected location must have its own recognizable illustration. A city label alone is not enough. Preserve the landmark's defining silhouette and proportions, even when simplifying details.

| Location | Features to preserve |
| --- | --- |
| Eiffel Tower — Paris | Tapering lattice tower, broad arch at the base, distinct observation levels |
| Tower Bridge — London | Two prominent towers joined by an upper walkway, with suspension elements and river below |
| Statue of Liberty — New York City | Raised torch, radiating crown, robed figure, and pedestal |
| Tokyo Tower — Tokyo | Red and pale lattice structure with broad legs and distinctive stacked platforms; distinguish it from the Eiffel Tower |
| Sydney Opera House — Sydney | Multiple overlapping sail-like shells on a low waterfront podium |
| Colosseum — Rome | Curved amphitheatre exterior with repeated tiers of arches and an incomplete upper edge |
| Golden Gate Bridge — San Francisco | Two tall red-toned towers, sweeping suspension cables, horizontal deck, and bay setting |

Use a few contextual cues—water, hills, riverbanks, or low buildings—to ground each landmark. Avoid filling every scene with extra attractions. The selected landmark should remain easy to identify at a glance on a small screen.

Ship all artwork as local web assets, preferably SVG with responsive sizing. Inspect illustrations at actual mobile browser sizes. Phase 1 may use clearly labelled placeholder landmarks; recognizable landmark artwork is required during visual polish.

## Motion and pacing

Use slow, restrained motion. Transit landscapes drift left to right; respect `prefers-reduced-motion` by keeping them static. Destination scenes and the balloon stay still. Clouds move at the same rate as terrain during transit and pause during destination holds.

- Use gentle opacity transitions, generally around one to two seconds, adjusted after visual review.
- Keep the camera and balloon fixed. Transit terrain and clouds move slowly left to right at the same rate; avoid zooms, parallax, and rapid scene sweeps.
- Convey distance through changing scenery and messages rather than speed or dramatic displacement.
- Keep text still while it is being read. Scene transitions must not repeatedly fade or reposition an active message.
- Fit transit, destination reveals, and transitions into the existing approximately 49-second schedule. Do not add time for separate travel screens.
- Reveal passing locations near 5 and 21 seconds, then the destination near 35 seconds. Hold each for seven seconds, with seven-second transit segments between locations. Start the final seven-second dissolve at 42 seconds; complete at 49 seconds.

At the destination, hold the scene for seven seconds, then fade the balloon and string gently into the sky over seven seconds. A simple opacity dissolve is preferred. If points of light are used, keep them sparse, nearly stationary, and softly fading. Use no popping sound, sudden flash, or confetti.

Keep the destination reflection while the balloon is intact and dissolving. After dissolution, gently fade it out and replace it with “What will you let go of next?” Keep this new prompt and the final landscape visible indefinitely. Nothing should hurry the user to start again.

## Typography and controls

Use a local system font stack such as `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` with regular or medium wsevens, generous line spacing, and a clear hierarchy. Keep interface text calm and direct. Avoid decorative scripts, all-caps prompts, and very thin type.

- Give the main prompt and reflection room to breathe. Omit eyebrow headers above the main heading.
- Display each message sentence on its own line with a blank line between sentences. Use a slightly smaller reflection size when needed for comfortable reading.
- Use comfortably sized rounded controls with clear labels and visible pressed states.
- Keep secondary actions visually quieter while remaining readable.
- Support browser zoom, text enlargement, keyboard navigation, visible focus, and screen readers, including VoiceOver. Use semantic labels and buttons; provide an equivalent accessible release interaction.
- Use touch targets at least 44 CSS pixels tall and wide where applicable. Do not disable pinch zoom or depend on hover.
- Expose destination and message changes through restrained screen-reader announcements without announcing every clock tick.
- Pointer cancellation, focus loss during a hold, and a hidden tab must not trigger release. Pause journey and dissolution timing while the document is hidden.
- Never use balloon colour as the only indicator of an interaction state.
- Preserve the approved message templates exactly; adapt layout rather than rewriting copy to fit.

## Screen direction

| Screen | Visual emphasis |
| --- | --- |
| Write | Warm neutral background, prompt, small balloon connected to a first-person hand, comfortable writing area, and one clear Continue action |
| Ready / holding | Small plain balloon on a long string, first-person outstretched arm and gripping hand, generous sky, and a prominent hold control |
| Journey | Stable balloon, horizontal scenery, a few clouds, and one readable message at a time |
| Closing | Final landmark scene, balloon gently disappearing, reflection, and a quiet optional restart action |

## Design review checklist

- Does the scene feel warm, calm, and soft without oversaturated colour?
- Is the balloon clearly red, blue, green, or yellow and consistent throughout the experience?
- Is the balloon body small relative to the long visible string?
- Before release, does an outstretched first-person arm end in a hand that visibly grips the string?
- Does the arm gently disappear after release without a camera jump?
- Does the portrait layout remain usable with mobile browser chrome, the keyboard, zoom, and a short viewport?
- Is the landscape horizontal, with no globe curvature or rotation?
- Does transit show a generic city, mountain, sea, forest, or desert landscape with a few clouds?
- Can each destination landmark be recognized without reading its label?
- Are all scenes consistent in illustration style and detail?
- Does transit scenery drift slowly left to right, stop at destinations, and remain static with reduced motion enabled?
- Does the full worry remain on the balloon until both dissolve together?
- Are messages readable on small screens and with larger text settings?
- Does the ending feel gentle and remain available without a countdown?

## Web implementation direction

Use semantic HTML for prompts, inputs, messages, and controls; CSS for responsive layout and soft opacity transitions; and plain JavaScript for the six-state flow and timing. Keep decorative SVG scenes separate from accessible text. Avoid remote fonts, graphics libraries, and heavy rendering dependencies for the POC.

A native iOS app is a future possibility only. Browser usability and the mobile portrait composition guide current design decisions.

## Held control and completion

While held, change the button to a contrasting muted green, add a clear outline, and show “✓ Holding · release when ready”. Restore its ready appearance after cancellation. This feedback has no countdown or minimum hold time.

Reveal “Release another worry” only after the final question has finished fading in.

## Balloon distance and destination review

Keep the full-size balloon before release for writing and holding. During the first seven-second transit, smoothly shrink the body, string, and writing together to 58% of their holding size, centred around the balloon body. Keep this distant scale throughout all destination stops and final dissolution. For reduced-motion users, crossfade between fixed full-size and distant balloons instead of scaling.

All seven updated destination scenes are integrated into the main journey. Visit `http://localhost:8000/artwork.html` to review each scene with the same distant balloon scale used in the app.

## Journey message wrapping

Use one consistent 19px font size for all main messages below the illustration, including transit, destination reflections, and the final question. Apply balanced line wrapping to reduce short trailing lines, retaining the blank line between sentences. Do not resize individual messages by phase; preserve browser text enlargement.

Primary action buttons use muted sage green (`#596E58`) with warm cream text (`#FFFBF4`) and a darker sage pressed state (`#485C47`). Keep the distinct outline, check mark, and label change on the held control.

## Departure before transit

After release, keep the original background and clouds stationary while the balloon shrinks to 58% size over seven seconds. Fade the arm away as before. Only after the balloon reaches its distant size should the first randomized transit landscape crossfade in and the travel clock begin. Reduced-motion users crossfade between fixed balloon sizes against the same original background.

The existing 49-second journey follows this separate seven-second departure, for approximately 56 seconds from release to completion. All timing pauses while the tab is hidden.

## Current departure and dissolution timing

Departure shrinking lasts **3.5 seconds**, followed by three seven-second transit segments and three seven-second destination holds. Final dissolution lasts **3.5 seconds**. The total is **49 seconds** from release to balloon disappearance, followed by the closing text fade. Travel and destination hold durations are unchanged.

The landing/holding background and generic city transit background use the same shared city illustration, including its windows, outlines, doors, and rooftop details. Transit adds horizontal motion; there is no separate landing-city drawing.

## New transit landscape studies

Cityscape is reserved for the landing/holding view and departure; it is not in the randomized transit pool. The pool now contains eight landscapes: mountains, snowy mountains, sea, forest, desert with pyramids, wheat field with a single red tractor, icy sea with icebergs and glaciers, and autumn forest with muted red/orange trees. Each journey selects three without repetition.

Review the three new SVG studies at `http://localhost:8000/landscapes.html`. They follow the same soft, muted art direction and use the existing transit movement.
