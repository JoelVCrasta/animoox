import type { SVGAttributes } from "react";

export const LetterIcon = ({
    fill = "#73748A",
}: SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 15 11" fill="none">
    <path d="M4.375 3.625L7.5 5.8125L10.625 3.625" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1.25 8.625V2.375C1.25 2.04348 1.3817 1.72554 1.61612 1.49112C1.85054 1.2567 2.16848 1.125 2.5 1.125H12.5C12.8315 1.125 13.1495 1.2567 13.3839 1.49112C13.6183 1.72554 13.75 2.04348 13.75 2.375V8.625C13.75 8.95652 13.6183 9.27446 13.3839 9.50888C13.1495 9.7433 12.8315 9.875 12.5 9.875H2.5C2.16848 9.875 1.85054 9.7433 1.61612 9.50888C1.3817 9.27446 1.25 8.95652 1.25 8.625Z" stroke={fill} stroke-width="1.5"/>
    </svg>
  )
}