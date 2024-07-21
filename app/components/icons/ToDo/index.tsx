import React from "react";
import Icon, { IconProps } from "../../Icon";

const Todo: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M8.57 12.37L10.81 14.61H10.82C10.99 14.78 11.26 14.78 11.43 14.61L15.44 10.6C15.61 10.43 15.61 10.16 15.44 9.99003L14.92 9.47003C14.75 9.30003 14.48 9.30003 14.31 9.47003L11.12 12.66L9.7 11.24C9.53001 11.07 9.26 11.07 9.09 11.24L8.57 11.76C8.40001 11.93 8.40001 12.2 8.57 12.37Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.6 6H17.41C17.74 6 18.01 6.27 18.01 6.6V17.41C18.01 17.74 17.74 18.01 17.41 18.01H6.6C6.27 18.01 6 17.74 6 17.41V6.6C6 6.27 6.27 6 6.6 6ZM16.8 16.8V7.2H7.2V16.8H16.8Z"
      />
    </Icon>
  );
};

export default Todo;
