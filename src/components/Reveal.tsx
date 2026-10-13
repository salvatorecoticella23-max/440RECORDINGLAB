import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur';

type Props = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
  threshold?: number;
};

const hiddenStyles: Record<Direction, string> = {
  up: 'opacity-0 translate-y-8',
  down: 'opacity-0 -translate-y-8',
  left: 'opacity-0 translate-x-4 sm:translate-x-8',
  right: 'opacity-0 -translate-x-4 sm:-translate-x-8',
  scale: 'opacity-0 scale-95',
  blur: 'opacity-0 blur-md',
};

const visibleStyles: Record<Direction, string> = {
  up: 'opacity-100 translate-y-0',
  down: 'opacity-100 translate-y-0',
  left: 'opacity-100 translate-x-0',
  right: 'opacity-100 translate-x-0',
  scale: 'opacity-100 scale-100',
  blur: 'opacity-100 blur-0',
};

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 700,
  className = '',
  as: Tag = 'div',
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`${visible ? visibleStyles[direction] : hiddenStyles[direction]} ${className}`}
      style={{
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
        maxWidth: '100%',
      }}
    >
      {children}
    </Tag>
  );
}
