"use client";

import { useEffect, type RefObject } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";

function parseSliderConfig(slider: HTMLElement): Partial<SwiperOptions> {
  const rawConfig = slider.dataset.sliderConfig;
  if (!rawConfig) return {};

  try {
    return JSON.parse(rawConfig) as Partial<SwiperOptions>;
  } catch (error) {
    console.warn("Invalid data-slider-config JSON:", error);
    return {};
  }
}

function useSliders(scopeRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const instances: Array<{
      swiper: Swiper;
      pagination: HTMLElement | null;
      paginationMarkup: string | null;
    }> = [];

    scope.querySelectorAll<HTMLElement>("[data-slider]").forEach((root) => {
      const swiperElement = root.querySelector<HTMLElement>(".swiper");
      if (!swiperElement) return;

      const pagination = root.querySelector<HTMLElement>(
        "[data-slider-pagination]",
      );
      const previous = root.querySelector<HTMLElement>(
        '[data-slider-btn="prev"]',
      );
      const next = root.querySelector<HTMLElement>('[data-slider-btn="next"]');
      const instanceConfig = parseSliderConfig(root);
      const paginationMarkup = pagination?.innerHTML ?? null;

      const swiper = new Swiper(swiperElement, {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 600,
        autoHeight: false,
        pagination: {
          el: pagination,
          clickable: true,
          renderBullet: (_index, className) =>
            `<span class="${className}"></span>`,
        },
        navigation: {
          prevEl: previous,
          nextEl: next,
        },
        ...instanceConfig,
      });

      instances.push({ swiper, pagination, paginationMarkup });
    });

    return () => {
      instances.forEach(({ swiper, pagination, paginationMarkup }) => {
        swiper.destroy(true, true);
        if (pagination && paginationMarkup !== null) {
          pagination.innerHTML = paginationMarkup;
        }
      });
    };
  }, [scopeRef]);
}

export function useRichMediaInteractions(
  scopeRef: RefObject<HTMLElement | null>,
) {
  useSliders(scopeRef);
}
