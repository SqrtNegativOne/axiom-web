/**
 * Google Material Symbols icon.
 *
 * The stylesheet is loaded in app/layout.jsx. `name` is a ligature name,
 * e.g. "podcasts", "palette", "movie", "edit_note". Size and colour are set
 * with Tailwind utility classes passed through `className`.
 */
export default function MaterialIcon({ name, className = '', ...props }) {
    return (
        <span
            className={`material-symbols-outlined ${className}`}
            aria-hidden="true"
            {...props}
        >
            {name}
        </span>
    )
}
