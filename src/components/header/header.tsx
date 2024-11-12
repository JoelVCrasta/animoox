"use client";

import Image from "next/image";
import { Logo } from "@/assets/images";
import { Button, ButtonWithLink } from "../ui";
import { CartButton } from "../button/cart-button/cart-button";
import { useEffect, useState } from "react";
import { headerList, productsSubMenu } from "./header.strings";
import { useSession, signOut } from "next-auth/react";
import { DribbleIcon } from "@/assets/icons";
import { ProfileIcon } from "@/assets/icons/profile-icon";
import Link from "next/link";

export const Header = (): JSX.Element => {
  const { data: session } = useSession();
  const [showProductMenu, setShowProductMenu] = useState<boolean>(false);
  const [showAuthMenu, setShowAuthMenu] = useState<boolean>(false);

  return (
    <header className="relative px-28 py-5 flex justify-center items-center gap-12">
      <Image alt="Logo" src={Logo} width={200} />

      <div className="flex justify-between flex-1">
        <span className="flex gap-4">
          {headerList(setShowProductMenu)
            .slice(0, 3)
            .map(({ label, attributes }) => (
              <ButtonWithLink key={attributes.href} {...attributes}>
                {label}
              </ButtonWithLink>
            ))}
        </span>

        <span className="flex gap-4">
          {headerList(setShowProductMenu)
            .slice(3)
            .map(({ label, attributes }) => (
              <ButtonWithLink key={attributes.href} {...attributes}>
                {label}
              </ButtonWithLink>
            ))}
          <CartButton href="/cart" variant="ghost" />
          {session ? (
              <Button
                className="rounded-full py-1 px-1 pr-2 border-brand font-normal flex justify-start items-center gap-2"
                size="lg"
                variant="ghost"
                onMouseEnter={()=>setShowAuthMenu(true)}
                onMouseLeave={()=>setShowAuthMenu(false)}
              >
                <ProfileIcon />
                <p className="text-brand">{session.user.name}</p>
              </Button>
          ) : (
            <Button
              className="!rounded-full hover:border-brand !py-2 !font-normal"
              size="lg"
              variant="ghost"
            >
              <Link href={"/auth/login"}>Sign in</Link>
            </Button>
          )}
        </span>
      </div>
      {showProductMenu ? (
        <section
          className="absolute flex gap-12 bg-bg p-6 rounded-xl shadow-2xl border translate-y-52 -translate-x-6 tra w-fit z-20"
          onMouseEnter={() => setShowProductMenu(true)}
          onMouseLeave={() => setShowProductMenu(false)}
        >
          {productsSubMenu.cards.map(({ title, details }) => (
            <article className="p-5 bg-white rounded-lg space-y-2" key={title}>
              <div className="w-72 h-48 bg-[#D9D9D9] rounded-md" />
              <h4>{title}</h4>
              <p className="text-secondary-text">{details}</p>
            </article>
          ))}

          <div className="grid grid-cols-2 gap-6">
            {productsSubMenu.categories.map((category,i) => (
              <article className="space-y-2" key={i}>
                <div className="w-40 h-[118px] rounded-lg bg-[#D9D9D9]" />
                <p>{category}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {showAuthMenu ? (
        <section
          className="absolute flex flex-col gap-3 py-3 bg-bg p-6 shadow-2xl right-0 border translate-y-36 -translate-x-6 tra w-fit z-20 border-brand"
          onMouseEnter={() => setShowAuthMenu(true)}
          onMouseLeave={() => setShowAuthMenu(false)}
        >
          <p className="font-extralight text-brand hover:text-brand cursor-pointer">Profile</p>
          <p className="font-extralight text-secondary-text hover:text-brand cursor-pointer">Purchased</p>
          <p className="font-extralight text-secondary-text hover:text-brand cursor-pointer">My Current Plan</p>
          <p className="font-extralight text-secondary-text hover:text-brand cursor-pointer">Account Settings</p>
          <p className="font-extralight text-secondary-text hover:text-brand cursor-pointer">Profile</p>
          <hr />
          <p className="font-extralight text-secondary-text hover:text-brand cursor-pointer" onClick={()=>signOut()}>Logout</p>
        </section>
      ) : null}
    </header>
  );
};
