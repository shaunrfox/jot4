import React from "react";
import Icon, { IconProps } from "../../Icon";

const AlignRight: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M17 7.5C17 7.22 17.22 7 17.5 7C17.78 7 18 7.22 18 7.5V16.5C18 16.78 17.78 17 17.5 17C17.22 17 17 16.78 17 16.5V7.5Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 9H15C15.55 9 16 9.45 16 10V14C16 14.55 15.55 15 15 15H7C6.45 15 6 14.55 6 14V10C6 9.45 6.45 9 7 9ZM7.1 13.9H14.9V10.1H7.1V13.9Z"
      />
    </Icon>
  );
};

export default AlignRight;
