'use client'
import { useState, useMemo } from 'react'

interface Props {
  name?: string | null
  size?: 'sm' | 'md' | 'lg'
  image?: string | null
}

const AUTHOR_PHOTOS: Record<string, string> = {
  'vibhu agarwal': '/speakers/Vibhu.webp',
  gaurav: '/speakers/Gaurav.jpg',
  'maarten koekebakker': '/leadership/Maarten.webp',
  'pawel michalkiewicz': '/leadership/pawel2.webp',
}

export default function AuthorAvatar({ name = 'JF', size = 'md', image = null }: Props) {
  const [imgFailed, setImgFailed] = useState(false)

  const photo = useMemo(() => {
    if (image) return image
    const key = (name ?? '').trim().toLowerCase()
    return AUTHOR_PHOTOS[key] ?? null
  }, [image, name])

  const showPhoto = !!photo && !imgFailed

  const initials = useMemo(() => {
    const n = (name ?? 'JF').trim()
    if (!n) return 'JF'
    return n.split(/\s+/).map(part => part[0]?.toUpperCase() ?? '').slice(0, 2).join('')
  }, [name])

  const bgIndex = useMemo(() => {
    const n = (name ?? '').toLowerCase()
    let h = 0
    for (let i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) >>> 0
    return h % 4
  }, [name])

  return (
    <>
      <style>{`
        .avatar-circle,.avatar-photo{flex-shrink:0;border-radius:50%}
        .avatar-photo{object-fit:cover;display:block;background:var(--accent-soft)}
        .avatar-circle{display:inline-flex;align-items:center;justify-content:center;color:white;font-family:var(--serif);font-style:italic;font-weight:500;letter-spacing:0.01em;user-select:none}
        .avatar-circle.size-sm,.avatar-photo.size-sm{width:32px;height:32px;font-size:13px}
        .avatar-circle.size-md,.avatar-photo.size-md{width:48px;height:48px;font-size:17px}
        .avatar-circle.size-lg,.avatar-photo.size-lg{width:64px;height:64px;font-size:22px}
        .avatar-circle.tone-0{background:linear-gradient(135deg,#143369 0%,#c8ab72 100%)}
        .avatar-circle.tone-1{background:linear-gradient(135deg,#b07c5a 0%,#d4a373 100%)}
        .avatar-circle.tone-2{background:linear-gradient(135deg,#5a6a7c 0%,#7c8c9c 100%)}
        .avatar-circle.tone-3{background:linear-gradient(135deg,#4a574a 0%,#6c7d6c 100%)}
      `}</style>
      {showPhoto ? (
        <img
          src={photo as string}
          alt={name ?? 'Author'}
          className={`avatar-photo size-${size}`}
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span className={`avatar-circle size-${size} tone-${bgIndex}`}>
          {initials}
        </span>
      )}
    </>
  )
}
