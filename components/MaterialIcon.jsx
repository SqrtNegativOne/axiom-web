/**
 * Google Material Icons (Outlined) icon.
 *
 * `name` is a ligature name, e.g. "podcasts", "palette", "movie". The font is
 * self-hosted (public/data/fonts) and subset to the names in data/icons.js —
 * add new names there and run `bun run icons`. Size and colour are set with
 * Tailwind classes.
 */
export default function MaterialIcon({ name, className = '', ...props }) {
    return (
        <span
            className={`material-icons-outlined ${className}`}
            aria-hidden="true"
            {...props}
        >
            {name}
        </span>
    )
}
