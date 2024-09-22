import React from "react";
import Icon, { IconProps } from "../../Icon";

const ArrowSquareUpRight: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M9.65 13.64C9.45 13.84 9.45 14.15 9.65 14.35C9.85 14.55 10.16 14.55 10.36 14.35L13.51 11.2V12.99C13.51 13.27 13.73 13.49 14.01 13.49C14.29 13.49 14.51 13.27 14.51 12.99V9.99001C14.51 9.71001 14.29 9.49001 14.01 9.49001H11.01C10.73 9.49001 10.51 9.71001 10.51 9.99001C10.51 10.27 10.73 10.49 11.01 10.49H12.8L9.65 13.64Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.6 6H17.41C17.74 6 18.01 6.27 18.01 6.6V17.41C18.01 17.74 17.74 18.01 17.41 18.01H6.6C6.27 18.01 6 17.74 6 17.41V6.6C6 6.27 6.27 6 6.6 6ZM16.8 16.8V7.2H7.2V16.8H16.8Z"
      />
    </Icon>
  );
};

export default ArrowSquareUpRight;
