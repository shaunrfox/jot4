import React from "react";
import Icon, { IconProps } from "../../Icon";

const Copy: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M17.5 6H9.5C9.22 6 9 6.22 9 6.5V9H6.5C6.22 9 6 9.22 6 9.5V17.5C6 17.78 6.22 18 6.5 18H14.5C14.78 18 15 17.78 15 17.5V15H17.5C17.78 15 18 14.78 18 14.5V6.5C18 6.22 17.78 6 17.5 6ZM17 14H15V9.5C15 9.22 14.78 9 14.5 9H10V7H17V14Z" />
    </Icon>
  );
};

export default Copy;
