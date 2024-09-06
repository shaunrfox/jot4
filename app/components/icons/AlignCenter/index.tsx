import React from "react";
import Icon, { IconProps } from "../../Icon";

const AlignCenter: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M17 9H12.5V7C12.5 6.72 12.28 6.5 12 6.5C11.72 6.5 11.5 6.72 11.5 7V9H7C6.45 9 6 9.45 6 10V14C6 14.55 6.45 15 7 15H11.5V17C11.5 17.28 11.72 17.5 12 17.5C12.28 17.5 12.5 17.28 12.5 17V15H17C17.55 15 18 14.55 18 14V10C18 9.45 17.55 9 17 9ZM7.1 13.9V10.1H16.9V13.9H7.1Z" />
    </Icon>
  );
};

export default AlignCenter;
