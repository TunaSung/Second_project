import { memo, useEffect, useState } from "react";
import Hero from "../../../../components/Layout/Hero";
import EventCard from "../feature/EventCard";
import ProductCard from "../feature/ProductCard";
import usePrefersReducedMotion from "../hook/usePrefersReducedMotion";
import TopBadge from "../feature/TopBadge";
import BottomBadge from "../feature/BottomBadge";
import Coverflow from "../feature/Coverflow";
import { getNewItem } from "../../../../services/productService";
import { getEvents } from "../../../../services/eventService"

// Swiper
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "../../../../style/Swiper.css";

function NewItemEvent() {
  const reduced = usePrefersReducedMotion();
  const carouselEffect = reduced ? "slide" : "coverflow";

  const [items, setItems] = useState([]);
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [itemData, eventData] = await Promise.all([
          getNewItem(),
          getEvents(),
        ]);
        if (!mounted) return;
        setItems(itemData?.product ?? []);
        setEvents(eventData?.events ?? []);
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setItems([]);
        setEvents([])
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Skeleton slides while loading
  const skeletons = Array.from({ length: 7 }).map((_, i) => (
    <SwiperSlide key={`sk-${i}`} className="w-auto">
      <div className="w-[15rem] h-[18rem] sm:w-[18rem] sm:h-[21rem] rounded-2xl bg-[var(--secondary-color)] ring-1 ring-black/10 animate-pulse" />
    </SwiperSlide>
  ));

  return (
    <Hero>
      {/* New events */}
      <section
        id="new-event"
        data-aos="fade-up"
        data-aos-offset="50"
        className="relative w-screen h-100 flex items-center justify-center overflow-hidden"
        aria-labelledby="section-events-title"
      >
        <h2 id="section-events-title" className="sr-only">
          New events
        </h2>
        <TopBadge />
        <Coverflow
          className="w-1/4 h-64 sm:h-83"
          ariaLabel="New events carousel"
          effect={carouselEffect}
        >
          {loading
            ? skeletons
            : (events.length ? events.map((ev) => (
                <SwiperSlide key={ev.id ?? `ev-${ev.title}`} className="w-auto">
                  <EventCard event={ev} />
                </SwiperSlide>
              )) : (
                <SwiperSlide className="w-auto">
                  <div className="w-[15rem] h-[18rem] sm:w-[18rem] sm:h-[21rem] grid place-items-center rounded-2xl bg-[var(--secondary-color)] ring-1 ring-black/10">
                    <span className="text-sm text-black/60">No events</span>
                  </div>
                </SwiperSlide>
              ))}
        </Coverflow>
        <div className="absolute border-3 border-[var(--quaternary-color)] bottom-[-10%] w-screen h-20 rounded-[50%]" />
      </section>

      {/* New arrivals */}
      <section
        id="new-item"
        data-aos="fade-up"
        data-aos-offset="150"
        className="relative w-screen h-98 -mt-10 flex items-center justify-center"
        aria-labelledby="section-arrivals-title"
      >
        <h2 id="section-arrivals-title" className="sr-only">
          New arrivals
        </h2>

        <Coverflow
          className="w-1/4 h-83 max-sm:h-64"
          ariaLabel="New arrivals carousel"
          effect={carouselEffect}
        >
          {loading
            ? skeletons
            : items.map((p) => (
                <SwiperSlide key={p.id} className="w-auto">
                  <ProductCard product={p} />
                </SwiperSlide>
              ))}
        </Coverflow>
        <BottomBadge />
      </section>
    </Hero>
  );
}

export default memo(NewItemEvent);
