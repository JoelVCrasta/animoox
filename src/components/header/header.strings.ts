import type { HeaderListsType, ProductsSubMenuType } from "./header.types";

export const headerList: HeaderListsType = (setShowProductMenu) => [
  {
    label: "Products",
    attributes: {
      href: "/products",
      className: "!rounded-full hover:border-brand !py-2 !font-normal",
      size: "lg",
      variant: "ghost",
      onMouseEnter: () => setShowProductMenu(true),
      onMouseLeave: () => setShowProductMenu(false),
    },
  },
  {
    label: "Icons",
    attributes: {
      href: "/icons",
      className: "!rounded-full hover:border-brand !py-2 !font-normal",
      size: "lg",
      variant: "ghost",
    },
  },
  {
    label: "Services",
    attributes: {
      href: "/services",
      className: "!rounded-full hover:border-brand !py-2 !font-normal",
      size: "lg",
      variant: "ghost",
    },
  },
  {
    label: "Request a Project",
    attributes: {
      href: "/request-project",
      className: "!rounded-full hover:border-brand !py-2 !font-normal",
      size: "lg",
      variant: "ghost",
    },
  },
  {
    label: "Get all Access",
    attributes: {
      href: "/plans",
      className: "!rounded-full !border-brand !py-2 !font-normal",
      size: "lg",
      variant: "ghost",
    },
  },
];

export const productsSubMenu: ProductsSubMenuType = {
  cards: [
    {
      title: "Animated illustrations",
      details: "Get lightweight Lottie animations",
    },
    {
      title: "Icon Animation",
      details: "Motion icon for web/app",
    },
  ],
  categories: ["Latest", "Trending", "Featured", "Blog"],
};
