import { useState } from "react";
import { ChevronLeft, ChevronRight } from "../icons/icons.jsx";

export default function ProjectGallery({ project }) {
  const { screenshots, youtube } = project;

  // Combine video (if exists) + screenshots
  const slides = [
    ...(youtube ? [{ type: "video", src: youtube }] : []),
    ...screenshots.map((s) => ({ type: "image", src: s })),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="mb-4 mx-4">
      <h2 className="text-xl font-semibold text-[var(--text)]">Gallery</h2>

      {slides.length > 0 && (
        <div className="relative group mt-4">
          {/* Slide container */}
          <div className="overflow-hidden bg-[var(--surface)] aspect-video">
            {/* Video slide */}
            {slides[currentIndex].type === "video" && (
              <iframe
                src={slides[currentIndex].src}
                title="Project Video"
                allowFullScreen
                className="w-full h-full"
              />
            )}

            {/* Image slide */}
            {slides[currentIndex].type === "image" && (
              <img
                src={slides[currentIndex].src}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-full object-cover pointer-events-none"
              />
            )}
          </div>

          {/* Navigation arrows */}
          {slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentIndex ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}