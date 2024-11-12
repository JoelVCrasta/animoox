import type { SVGAttributes } from "react";

export const CursorIcon = ({
    fill = "#73748A",
}: SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 15 15" fill="none">
    <path d="M3.4372 6.23129C2.6847 6.53691 2.7422 7.62129 3.52282 7.84566L7.46407 8.97879L9.26407 12.6632C9.62032 13.3932 10.6984 13.2613 10.8691 12.4669L12.7034 3.91066C12.7362 3.75858 12.7269 3.60044 12.6765 3.45325C12.6261 3.30606 12.5366 3.17539 12.4175 3.07531C12.2984 2.97522 12.1542 2.90951 12.0005 2.88524C11.8469 2.86096 11.6895 2.87904 11.5453 2.93754L3.4372 6.23129Z" stroke={fill} stroke-width="1.5"/>
    </svg>
  )
}