import { useState } from 'react'

function InitialsAvatar({ name, className = '' }) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div className={`flex items-center justify-center bg-green-dark text-cream font-heading text-xl font-light ${className}`}>
      {initials}
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
              onError={() => setImgFailed(true)}
            />
          ) : (
            <InitialsAvatar name={name} className="w-full h-full" />
          )}
        </div>
        <div>
          <p className="font-heading text-lg font-medium text-green leading-tight">{name}</p>
          <p className="font-body text-xs text-gold tracking-wider">Batch {batch}</p>
        </div>
      </div>
      <div className="border-t border-gold/20" />
      <p className="font-body text-sm text-ink/70 leading-relaxed italic">"{thought}"</p>
    </div>
  )
}
