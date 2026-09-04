"use client";

import {
  type ComponentPropsWithoutRef,
  type MouseEvent,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type AccordionProps = ComponentPropsWithoutRef<"div">;

type AttributeSnapshot = {
  element: HTMLElement;
  name: string;
  value: string | null;
};

function restoreAttribute({ element, name, value }: AttributeSnapshot) {
  if (value === null) {
    element.removeAttribute(name);
  } else {
    element.setAttribute(name, value);
  }
}

export function Accordion({ children, onClick, ...props }: AccordionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const accordionId = useId().replaceAll(":", "");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const getItems = () => {
    const root = rootRef.current;
    if (!root) return [];
    return Array.from(root.children).filter(
      (child): child is HTMLElement =>
        child instanceof HTMLElement &&
        child.hasAttribute("data-accordion-item"),
    );
  };

  useLayoutEffect(() => {
    const snapshots: AttributeSnapshot[] = [];
    getItems().forEach((item, index) => {
      const trigger = item.querySelector<HTMLElement>(
        ":scope > [data-accordion-trigger]",
      );
      const content = item.querySelector<HTMLElement>(
        ":scope > [data-accordion-content]",
      );
      if (!trigger || !content) return;

      const triggerId = trigger.id || `${accordionId}-trigger-${index}`;
      const contentId = content.id || `${accordionId}-content-${index}`;
      const attributes: Array<[HTMLElement, string]> = [
        [trigger, "id"],
        [trigger, "aria-controls"],
        [trigger, "aria-expanded"],
        [content, "id"],
        [content, "role"],
        [content, "aria-labelledby"],
        [content, "aria-hidden"],
      ];
      attributes.forEach(([element, name]) => {
        snapshots.push({
          element,
          name,
          value: element.getAttribute(name),
        });
      });

      trigger.id = triggerId;
      trigger.setAttribute("aria-controls", contentId);
      trigger.setAttribute("aria-expanded", "false");
      content.id = contentId;
      content.setAttribute("role", "region");
      content.setAttribute("aria-labelledby", triggerId);
      content.setAttribute("aria-hidden", "true");
    });

    return () => snapshots.forEach(restoreAttribute);
  }, [accordionId]);

  useLayoutEffect(() => {
    getItems().forEach((item, index) => {
      const isOpen = index === openIndex;
      item
        .querySelector<HTMLElement>(":scope > [data-accordion-trigger]")
        ?.setAttribute("aria-expanded", String(isOpen));
      item
        .querySelector<HTMLElement>(":scope > [data-accordion-content]")
        ?.setAttribute("aria-hidden", String(!isOpen));
    });
  }, [openIndex]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const target = event.target as HTMLElement;
    const trigger = target.closest<HTMLElement>("[data-accordion-trigger]");
    const item = trigger?.closest<HTMLElement>("[data-accordion-item]");
    const root = rootRef.current;
    if (!trigger || !item || !root || item.parentElement !== root) return;

    const index = getItems().indexOf(item);
    if (index < 0) return;
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div {...props} data-accordion="" ref={rootRef} onClick={handleClick}>
      {children}
    </div>
  );
}
