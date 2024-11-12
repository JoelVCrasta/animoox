import type { SVGAttributes } from "react";

export const TrafficInsightsIcon = ({
    fill = "#73748A",
}: SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 15 14" fill="none">
    <path d="M8.125 12.125H2.5C2.16848 12.125 1.85054 11.9933 1.61612 11.7589C1.3817 11.5245 1.25 11.2065 1.25 10.875V2.125C1.25 1.79348 1.3817 1.47554 1.61612 1.24112C1.85054 1.0067 2.16848 0.875 2.5 0.875H12.5C12.8315 0.875 13.1495 1.0067 13.3839 1.24112C13.6183 1.47554 13.75 1.79348 13.75 2.125V8.375" stroke={fill} stroke-width="1.5" stroke-linecap="round"/>
    <path d="M1.25 3.37501H13.75M3.125 2.13126L3.13125 2.12439M5 2.13126L5.00625 2.12439M6.875 2.13126L6.88125 2.12439M10 11.5L11.25 12.75L13.75 10.25" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}