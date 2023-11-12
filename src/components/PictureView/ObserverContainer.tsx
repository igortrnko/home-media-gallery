import { FC, PropsWithChildren, useEffect, useRef } from "react";

interface ObserverContainer extends PropsWithChildren {
  onEndReached?: () => void;
  shouldExecute?: boolean;
}

const ObserverContainer: FC<ObserverContainer> = ({
  children,
  onEndReached,
  shouldExecute = true,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const endReachedFn = useRef(onEndReached);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && shouldExecute) {
        endReachedFn.current?.();
      }
    });

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [shouldExecute]);

  return (
    <>
      {children}
      <div ref={elementRef} role="none" />
    </>
  );
};

export default ObserverContainer;
