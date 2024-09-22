import React from "react";
import Icon, { IconProps } from "../../Icon";

const Divider: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M18.84 11.25H5.15999C4.96117 11.25 4.79999 11.4112 4.79999 11.61V12.39C4.79999 12.5888 4.96117 12.75 5.15999 12.75H18.84C19.0388 12.75 19.2 12.5888 19.2 12.39V11.61C19.2 11.4112 19.0388 11.25 18.84 11.25Z" />
    </Icon>
  );
};

export default Divider;
