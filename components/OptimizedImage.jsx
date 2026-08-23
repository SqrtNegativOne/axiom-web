import Image from 'next/image'

export default function OptimizedImage({ src, alt = '', className = '', style, ...rest }) {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex' }}>
            <Image 
                src={src} 
                alt={alt}
                fill
                style={{ objectFit: 'cover', ...style }}
                className={className}
                {...rest}
            />
        </div>
    )
}
