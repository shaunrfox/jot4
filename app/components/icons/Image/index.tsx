import React from "react";
import Icon, { IconProps } from "../../Icon";

const Image: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M17 6H7C6.45 6 6 6.45 6 7V17C6 17.55 6.45 18 7 18H17C17.55 18 18 17.55 18 17V7C18 6.45 17.55 6 17 6ZM7 7H17V11.84L15.46 10.3C15.07 9.91 14.44 9.91 14.05 10.3L7.34 17H7V7ZM9 10C9 9.45 9.45 9 10 9C10.55 9 11 9.45 11 10C11 10.55 10.55 11 10 11C9.45 11 9 10.55 9 10Z" />
    </Icon>
  );
};

export default Image;
