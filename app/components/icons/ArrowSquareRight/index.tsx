import React from "react";
import Icon, { IconProps } from "../../Icon";

const ArrowSquareRight: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M9.00002 11.995L9 12V11.99L9.00002 11.995Z" />
      <path d="M9.00002 11.995C9.00262 12.2726 9.22167 12.49 9.5 12.49H13.29L12.14 13.64C11.94 13.84 11.94 14.15 12.14 14.35C12.34 14.55 12.65 14.55 12.85 14.35L14.85 12.35C15.05 12.15 15.05 11.84 14.85 11.64L12.85 9.64C12.65 9.44 12.34 9.44 12.14 9.64C11.94 9.84 11.94 10.15 12.14 10.35L13.29 11.5H9.5C9.22167 11.5 9.00262 11.7174 9.00002 11.995Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.6 6H17.41C17.74 6 18.01 6.27 18.01 6.6V17.41C18.01 17.74 17.74 18.01 17.41 18.01H6.6C6.27 18.01 6 17.74 6 17.41V6.6C6 6.27 6.27 6 6.6 6ZM7.2 16.8H16.8V7.2H7.2V16.8Z"
      />
    </Icon>
  );
};

export default ArrowSquareRight;
