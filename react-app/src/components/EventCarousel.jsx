import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation, Virtual } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function EventCarousel({ images, eventTitle }) {
  const validImages = (images || []).filter(Boolean)

  if (validImages.length === 0) return null

  return (
    <div className="event-carousel-wrapper my-8">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 35,
          stretch: 0,
          depth: 150,
          modifier: 1.5,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        virtual={{ addSlidesBefore: 1, addSlidesAfter: 1 }}
        modules={[EffectCoverflow, Pagination, Navigation, Virtual]}
        className="event-swiper"
      >
        {validImages.map((src, idx) => (
          <SwiperSlide key={idx} virtualIndex={idx}>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full focus:outline-none focus:ring-2 focus:ring-gold/50 overflow-hidden"
              aria-label={`View ${eventTitle} photo ${idx + 1} in new tab`}
            >
              <img
                src={src}
                alt={`${eventTitle} — photo ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => { e.target.parentElement.style.display = 'none' }}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
