import type { ComponentPropsWithoutRef, ReactNode } from "react";
import React, { useMemo } from "react";

import Link from "next/link";
import styled, { useTheme } from "styled-components";

import { Tooltip } from "..";
import type { IconButtonColor, IconButtonSize } from "./iconButtonVariants";
import { getIconButtonColor, iconButtonSizeVariants } from "./iconButtonVariants";

interface IconLinkButtonProps extends ComponentPropsWithoutRef<"a"> {
  children: ReactNode;
  href: string;
  title?: string;
  disableFocus?: boolean;
  size?: IconButtonSize;
  color?: IconButtonColor;
}

export const IconLinkButton = ({
  children,
  href,
  title = "",
  disableFocus = false,
  size = "medium",
  color = "primary",
  ...props
}: IconLinkButtonProps) => {
  const { primary05, white, neutral300 } = useTheme();

  const iconButtonColors = useMemo((): [string, string] => {
    if (color === "primary") return [primary05, primary05];

    if (color === "secondary") return [neutral300, primary05];

    if (color === "white") return [white, white];

    return [neutral300, color];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  return (
    <Tooltip content={title}>
      <LinkElement
        aria-label={title}
        href={href}
        size={size}
        $color={iconButtonColors}
        tabIndex={disableFocus ? -1 : 0}
        {...props}
      >
        {children}
      </LinkElement>
    </Tooltip>
  );
};

const LinkElement = styled(Link)<IconLinkButtonProps & { $color: [string, string] }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 34px;
  min-height: 34px;
  width: max-content;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s, box-shadow 0.2s, opacity 0.2s, transform 0.2s;

  ${({ $color }) => getIconButtonColor($color)};
  ${({ size }) => iconButtonSizeVariants[size || "medium"]};
`;
