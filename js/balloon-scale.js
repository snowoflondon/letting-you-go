export const DISTANT_SCALE = 0.58;
export function departureProgress(elapsed) {
 return Math.min(1, Math.max(0, elapsed / 7000));
}
export function journeyScale(elapsed) {
 const t = departureProgress(elapsed);
 const eased = t * t * (3 - 2 * t);
 return 1 - (1 - DISTANT_SCALE) * eased;
}
// Keep the body centred in the open sky while its string and writing scale with it.
export function balloonTransform(scale) {
 return `translate(200 90) scale(${scale}) translate(-200 -90)`;
}
