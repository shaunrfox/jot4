import React from "react";
import Icon, { IconProps } from "../../Icon";

const ArrowLineRight: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M17.1 18C16.9343 18 16.8 17.8657 16.8 17.7V6.3C16.8 6.13431 16.9343 6 17.1 6H17.7C17.8657 6 18 6.13431 18 6.3V17.7C18 17.8657 17.8657 18 17.7 18H17.1Z" />
      <path d="M14.85 12.41C14.94 12.3 15 12.16 15 12H15.01C15.01 11.85 14.95 11.71 14.86 11.6L12.11 8.23C11.89 7.97 11.49 7.94 11.23 8.16C10.97 8.38 10.93 8.78 11.16 9.04L13.02 11.38H6.63C6.28 11.38 6 11.65 6 12C6 12.35 6.27 12.63 6.62 12.63H13.01L11.15 14.97C10.93 15.23 10.96 15.62 11.22 15.85C11.48 16.07 11.88 16.04 12.1 15.78L14.85 12.41Z" />
    </Icon>
  );
};

export default ArrowLineRight;
