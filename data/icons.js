/**
 * Every icon name passed to <MaterialIcon> across the site.
 *
 * The font is self-hosted at public/data/fonts/material-icons-outlined.woff2
 * and subset to exactly these glyphs. After adding a name here, regenerate it:
 *
 *   node scripts/fetch-material-icons.mjs
 */
export const ICON_NAMES = [
    'assignment',
    'chair',
    'code',
    'diversity_3',
    'edit_note',
    'handshake',
    'mic',
    'movie',
    'open_in_new',
    'palette',
    'podcasts',
    'psychology',
]

// Classic Material Icons (Outlined), subset to ICON_NAMES. Used by the
// regeneration script above; the browser never loads this URL directly.
export const ICON_FONT_CSS_URL =
    'https://fonts.googleapis.com/css2?family=Material+Icons+Outlined&icon_names=' +
    [...ICON_NAMES].sort().join(',')
