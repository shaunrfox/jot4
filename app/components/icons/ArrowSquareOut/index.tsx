import React from "react";
import Icon, { IconProps } from "../../Icon";

const ArrowSquareOut: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M18.5 10C18.78 10 19 9.78 19 9.5V5.5C19 5.22 18.78 5 18.5 5H14.5C14.22 5 14 5.22 14 5.5C14 5.78 14.22 6 14.5 6H17.29L13.14 10.15C12.94 10.35 12.94 10.66 13.14 10.86C13.34 11.06 13.65 11.06 13.85 10.86L18 6.71V9.5C18 9.78 18.22 10 18.5 10Z" />
      <path d="M16.4 17H7.59C7.27 17 7 16.73 7 16.4V7.59C7 7.27 7.26 7 7.59 7H11.7C11.87 7 12 7.14 12 7.3V7.9C12 8.07 11.87 8.2 11.7 8.2H8.2V15.79H15.8V12.29C15.8 12.12 15.93 11.99 16.1 11.99H16.7C16.87 11.99 17 12.13 17 12.29V16.4C17 16.73 16.73 17 16.4 17Z" />
    </Icon>
  );
};

export default ArrowSquareOut;
