import React from "react";
import Icon, { IconProps } from "../../Icon";

const Eraser: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M18.56 9.03L15.98 6.44C15.39 5.85 14.44 5.85 13.86 6.44L6.44 13.85C5.85 14.44 5.85 15.39 6.44 15.97L8.32 17.85C8.41 17.94 8.54 18 8.67 18H18C18.28 18 18.5 17.78 18.5 17.5C18.5 17.22 18.28 17 18 17H12.71L18.57 11.15C19.16 10.56 19.16 9.61 18.57 9.03H18.56ZM17.85 10.44L14.5 13.8L11.21 10.51L14.57 7.16C14.77 6.96 15.08 6.96 15.28 7.16L17.87 9.75C18.07 9.95 18.07 10.26 17.87 10.46L17.85 10.44Z" />
    </Icon>
  );
};

export default Eraser;
