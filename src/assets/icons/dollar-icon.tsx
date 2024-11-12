import type { SVGAttributes } from "react";

export const DollarIcon = ({
    fill = "#73748A",
}: SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 15 15" fill="none">
    <path d="M10.0958 4.47125C9.50269 3.87812 8.45895 3.46625 7.49957 3.44M7.49957 3.44C6.35832 3.40938 5.33644 3.92625 5.33644 5.33625C5.33644 7.9325 10.0958 6.63438 10.0958 9.23063C10.0958 10.7119 8.82895 11.3481 7.49957 11.3M7.49957 3.44V1.875M4.90332 10.0962C5.46145 10.84 6.49832 11.2637 7.49957 11.3M7.49957 11.3V13.125" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )  
}