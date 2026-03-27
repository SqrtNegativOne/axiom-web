import { useState } from 'react'

function DefaultAvatar({ className = '' }) {
  return (
    <div className={`flex items-center justify-center bg-green ${className}`}>
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

export default function AlumniCard({ name, batch, image, thought }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div className="bg-cream-dark p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
          {image && !imgFailed ? (
            <img
              src={image}
              alt={`Portrait of ${name}`}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <DefaultAvatar className="w-full h-full" />
          )}
        </div>
        <div>
          <p className="font-heading text-lg font-medium text-green leading-tight">{name}</p>
          <p className="font-body text-xs text-gold tracking-wider">Batch {batch}</p>
        </div>
      </div>
      <div className="border-t border-gold/20" />
      <p className="font-body text-sm text-ink/70 leading-relaxed italic">&ldquo;{thought}&rdquo;</p>
    </div>
  )
}
