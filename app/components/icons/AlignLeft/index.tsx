import React from "react";
import Icon, { IconProps } from "../../Icon";

const AlignLeft: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M6 7.5C6 7.22 6.22 7 6.5 7C6.78 7 7 7.22 7 7.5V16.5C7 16.78 6.78 17 6.5 17C6.22 17 6 16.78 6 16.5V7.5Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 9H17C17.55 9 18 9.45 18 10V14C18 14.55 17.55 15 17 15H9C8.45 15 8 14.55 8 14V10C8 9.45 8.45 9 9 9ZM9.1 13.9H16.9V10.1H9.1V13.9Z"
      />
    </Icon>
  );
};

export default AlignLeft;
