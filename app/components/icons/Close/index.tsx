import React from "react";
import Icon, { IconProps } from "../../Icon";

const Close: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M13.07 12L16.4 8.67C16.53 8.54 16.53 8.33 16.4 8.19L15.81 7.6C15.68 7.47 15.47 7.47 15.33 7.6L12 10.93L8.67 7.6C8.54 7.47 8.33 7.47 8.19 7.6L7.6 8.19C7.47 8.32 7.47 8.53 7.6 8.67L10.93 12L7.6 15.33C7.47 15.46 7.47 15.67 7.6 15.81L8.19 16.4C8.32 16.53 8.53 16.53 8.67 16.4L12 13.07L15.33 16.4C15.46 16.53 15.67 16.53 15.81 16.4L16.4 15.81C16.53 15.68 16.53 15.47 16.4 15.33L13.07 12Z" />
    </Icon>
  );
};

export default Close;
