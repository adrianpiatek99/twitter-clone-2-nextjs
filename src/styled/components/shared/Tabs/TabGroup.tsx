import React, { ComponentPropsWithoutRef } from "react";

import Tabs from "@mui/material/Tabs";

type TabGroupProps = ComponentPropsWithoutRef<typeof Tabs>;

export const TabGroup: Component<TabGroupProps> = ({ children, ...props }) => {
  return (
    <Tabs
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      aria-label="scrollable force tabs example"
      {...props}
    >
      {children}
    </Tabs>
  );
};
