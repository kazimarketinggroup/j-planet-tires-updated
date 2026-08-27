import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface NewsGalleryProps {
  images: string[];
  /** Used for the alt text of every slide, suffixed with the slide number. */
  title: string;
}

// Horizontal travel of the outgoing/incoming slide, in pixels.
const SLIDE_OFFSET = 60;
const SWIPE_THRESHOLD = 60;

// `custom` carries the navigation direction so the slide enters from the side
// the user is heading towards and leaves on the opposite one.
const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * SLIDE_OFFSET }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -SLIDE_OFFSET }),
};

const NewsGallery = ({ images, title }: NewsGalleryProps) => {
  const [index, setIndex] = useState(0);
  // +1 when moving forward, -1 when moving back, so the slide animates the way
  // the user is navigating.
  const [direction, setDirection] = useState(1);
  const frameRef = useRef<HTMLDivElement>(null);

  const count = images.length;

  const goTo = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const goPrev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1, 1), [goTo, index]);

  // Arrow keys drive the slider while it has focus.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || count < 2) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      }
    };

    frame.addEventListener('keydown', handleKeyDown);
    return () => frame.removeEventListener('keydown', handleKeyDown);
  }, [count, goPrev, goNext]);

  // Single photo: render it plainly, no slider chrome.
  if (count < 2) {
    return (
      <div className="overflow-hidden rounded-2xl shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
        <img src={images[0]} alt={title} className="aspect-[16/8] w-full object-cover" />
      </div>
    );
  }

  return (
    <div>
      <div
        ref={frameRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={title}
        className="group relative aspect-[16/8] overflow-hidden rounded-2xl bg-[#0a1b3d] shadow-[0_18px_50px_rgba(15,23,42,0.12)] outline-none focus-visible:ring-2 focus-visible:ring-[#1148c6] focus-visible:ring-offset-2"
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={index}
            src={images[index]}
            alt={`${title} — ${index + 1} / ${count}`}
            className="absolute inset-0 h-full w-full object-cover"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: 'easeOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_THRESHOLD) goNext();
              else if (info.offset.x > SWIPE_THRESHOLD) goPrev();
            }}
            draggable={false}
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#111111] shadow-md transition hover:bg-white md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100 2xl:h-12 2xl:w-12"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#111111] shadow-md transition hover:bg-white md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100 2xl:h-12 2xl:w-12"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <span className="absolute bottom-3 right-3 z-10 rounded bg-black/55 px-2.5 py-1 text-xs font-semibold text-white">
          {index + 1} / {count}
        </span>
      </div>

      {/* Thumbnail strip — the hero is already on screen, so only the extra shots. */}
      <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
        {images.slice(1).map((image, i) => {
          const slide = i + 1; // index into `images`, since the hero is sliced off
          return (
            <button
              key={image}
              type="button"
              onClick={() => goTo(slide, slide > index ? 1 : -1)}
              aria-label={`Show photo ${slide + 1}`}
              aria-current={slide === index}
              className={`aspect-[16/9] overflow-hidden rounded-xl transition ${
                slide === index ? 'ring-2 ring-[#1148c6] ring-offset-2' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NewsGallery;
