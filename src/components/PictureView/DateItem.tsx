import { CSSProperties, FC } from "react";

interface DateItemProps {
  style: CSSProperties;
  date: string;
}

const DateItem: FC<DateItemProps> = ({ style, date }) => {
  return (
    <div style={style} className="flex items-end py-2">
      {date}
    </div>
  );
};

export default DateItem;
