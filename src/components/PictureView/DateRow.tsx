import React, { FC } from "react";
import VirtualizerRowWrapper from "./VirtualizerRowWrapper";

interface DateRowProps {
  date: string;
  height: number;
  translateY: number;
}

const DateRow: FC<DateRowProps> = ({ date, height, translateY }) => {
  return (
    <VirtualizerRowWrapper
      height={height}
      translateY={translateY}
      className="flex items-end pb-1 font-semibold"
    >
      {date}
    </VirtualizerRowWrapper>
  );
};

export default DateRow;
