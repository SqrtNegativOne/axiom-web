/**
 * Every icon name passed to <MaterialIcon> across the site.
 *
 * This list feeds the Google Fonts `icon_names` subset parameter, so the
 * browser downloads only these glyphs (a couple of KB) instead of the entire
 * icon font (several MB). Add a name here whenever you use a new icon.
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

// Classic Material Icons (Outlined), subset to ICON_NAMES.
export const ICON_FONT_HREF =
    'https://fonts.googleapis.com/css2?family=Material+Icons+Outlined&icon_names=' +
    [...ICON_NAMES].sort().join(',')
