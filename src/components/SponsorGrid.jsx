import Image from 'next/image'

export default function SponsorGrid() {
  const images = [
    '/1.png',
    '/2.png',
    '/3.png',
    '/4.png',
    '/5.png',
    '/6.png',
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((src, index) => (
        <div key={index} className="aspect-w-1 aspect-h-1">
          <Image
            src={src}
            alt={`Image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  )
}