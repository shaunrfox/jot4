import React from "react";
import Icon, { IconProps } from "../../Icon";

const Check: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M9.72 16.345L6.12 12.745C5.96 12.585 5.96 12.325 6.12 12.165L6.63 11.655C6.79 11.495 7.05 11.495 7.21 11.655L10.01 14.455L16.79 7.66498C16.95 7.50498 17.21 7.50498 17.37 7.66498L17.88 8.17498C18.04 8.33498 18.04 8.59498 17.88 8.74498L10.29 16.335C10.13 16.495 9.87 16.495 9.71 16.335L9.72 16.345Z" />
    </Icon>
  );
};

export default Check;
