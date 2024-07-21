import React from "react";
import Icon, { IconProps } from "../../Icon";

const Columns: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M17.3905 6H6.5995C6.26978 6 6 6.26978 6 6.5995V17.4005C6 17.7302 6.26978 18 6.5995 18H17.4005C17.7302 18 18 17.7302 18 17.4005V6.5995C18 6.26978 17.7302 6 17.4005 6H17.3905ZM7.199 7.199H11.3955V16.791H7.199V7.199ZM16.791 16.791H12.5945V7.199H16.791V16.791Z" />
    </Icon>
  );
};

export default Columns;
