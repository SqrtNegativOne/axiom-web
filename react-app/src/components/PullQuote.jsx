// Decorative pull quote with terracotta left border
export default function PullQuote({ children, attribution, className = '' }) {
  return (
    <blockquote
      className={`border-l-4 border-terracotta pl-6 my-10 ${className}`}
    >
      <p className="font-heading text-green italic font-light leading-relaxed"
         style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
        {children}
      </p>
      {attribution && (
        <footer className="mt-3 font-body text-sm text-ink/60 not-italic">
          — {attribution}
        </footer>
      )}
    </blockquote>
  )
}
