import React from "react";
import Icon, { IconProps } from "../../Icon";

const Italic: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M15.42 6H10.18C10 6 9.85 6.15 9.85 6.33V6.86C9.85 7.04 10 7.19 10.18 7.19H12.19L10.27 16.79H8.58C8.4 16.79 8.25 16.94 8.25 17.12V17.65C8.25 17.83 8.4 17.98 8.58 17.98H13.91C14.09 17.98 14.24 17.83 14.24 17.65V17.12C14.24 16.94 14.09 16.79 13.91 16.79H11.8L13.72 7.2H15.41C15.59 7.2 15.74 7.05 15.74 6.87V6.33C15.74 6.15 15.59 6 15.41 6H15.42Z" />
    </Icon>
  );
};

export default Italic;
