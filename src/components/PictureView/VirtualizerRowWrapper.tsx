import { FC, PropsWithChildren } from "react";

interface VirtualizerRowWrapperProps extends PropsWithChildren {
  height: number;
  translateY: number;
  className?: string;
}

const VirtualizerRowWrapper: FC<VirtualizerRowWrapperProps> = ({
  height,
  translateY,
  children,
  className = "",
}) => {
  return (
    <div
      className={`absolute top-0 left-0 w-full ${className}`}
      style={{
        height: `${height}px`,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default VirtualizerRowWrapper;
