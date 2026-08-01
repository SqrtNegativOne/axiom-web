// Generic person silhouette — shown when no photo is available or image fails to load
export default function DefaultAvatar({ className = '' }) {
    return (
        <div
            className={`flex items-center justify-center bg-green ${className}`}
        >
            <svg viewBox="0 0 80 80" fill="none" className="w-3/5 h-3/5">
                <circle cx="40" cy="28" r="12" fill="#F8F4EC" opacity="0.35" />
                <path
                    d="M16 72c0-13.255 10.745-24 24-24s24 10.745 24 24"
                    fill="#F8F4EC"
                    opacity="0.35"
                />
            </svg>
        </div>
    )
}
