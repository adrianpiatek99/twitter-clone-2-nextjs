import type { Ref, SVGProps } from "react";
import * as React from "react";
import { forwardRef } from "react";

const SvgHashtagIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg viewBox="0 0 448 512" fill="currentColor" height="1em" width="1em" ref={ref} {...props}>
    <path d="M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8l-9.8 58.8h95.1l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8l-9.7 58.8H416c17.7 0 32 14.3 32 32s-14.3 32-32 32h-68.9l-21.3 128H384c17.7 0 32 14.3 32 32s-14.3 32-32 32h-68.9l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7h-95.2l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.7-58.9H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l21.3-128H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zm5.8 159.6-21.3 128h95.1l21.3-128h-95.1z" />
  </svg>
);
const ForwardRef = forwardRef(SvgHashtagIcon);
export default ForwardRef;
