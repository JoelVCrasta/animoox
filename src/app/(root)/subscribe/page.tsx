"use client"

import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { openSubscriptionCheckout } from "@/lib/paddle-loader"

export default function SlidePricing() {
  const [selected, setSelected] = useState<"M" | "A">("M")
  const [email, setEmail] = useState("")
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: "Free Plan",
      price: 0,
      priceId: "pri_01jcwhgjgg5h8bc9j5hf52hdpn",
    },
    {
      id: 2,
      name: "Pro Plan",
      price: 49,
      priceId: "pri_01jcwhgjgg5h8bc9j5hf52hdpn",
    },
  ])

  return (
    <section className="w-full text-black bg-white px-4 lg:px-8 py-12 lg:py-24 relative overflow-hidden">
      <Heading selected={selected} setSelected={setSelected} />
      <PriceCards selected={selected} />
      <TopLeftCircle />
      <BottomRightCircle />
    </section>
  )
}

const SELECTED_STYLES = "text-white font-medium rounded-lg py-3 w-28 relative"
const DESELECTED_STYLES =
  "font-medium rounded-lg py-3 w-28 hover:bg-slate-100 transition-colors relative"

interface HeadingProps {
  selected: "M" | "A"
  setSelected: React.Dispatch<React.SetStateAction<"M" | "A">>
}

const Heading = ({ selected, setSelected }: HeadingProps) => {
  return (
    <div className="mb-12 lg:mb-24 relative z-10">
      <h3 className="font-semibold text-5xl lg:text-7xl text-center mb-6">
        Pricing plans
      </h3>
      <p className="text-center mx-auto max-w-lg mb-8">
        Lorem ipsum dolor sit amet consectetur. Pulvinar eu rhoncus tincidunt
        eget mattis netus ridiculus.
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setSelected("M")}
          className={selected === "M" ? SELECTED_STYLES : DESELECTED_STYLES}
        >
          Monthly
          {selected === "M" && <BackgroundShift />}
        </button>
        <div className="relative">
          <button
            onClick={() => setSelected("A")}
            className={selected === "A" ? SELECTED_STYLES : DESELECTED_STYLES}
          >
            Annual
            {selected === "A" && <BackgroundShift />}
          </button>
        </div>
      </div>
    </div>
  )
}

const BackgroundShift = () => (
  <motion.span
    layoutId="bg-shift"
    className="absolute inset-0 bg-black rounded-lg -z-10"
  />
)

interface PriceCardProps {
  selected: "M" | "A"
}

const PriceCards = ({ selected }: PriceCardProps) => (
  <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 w-full max-w-6xl mx-auto relative z-10">
    {/* FREE */}
    <div className="w-full bg-white p-6 border-[1px] border-slate-300 rounded-xl">
      <p className="text-2xl font-bold mb-2">Free</p>
      <p className="text-lg mb-6">Everything to start</p>
      <p className="text-6xl font-bold mb-8">
        $0<span className="font-normal text-xl">/month</span>
      </p>
      <div className="flex items-center gap-2 mb-2">
        <svg
          width="20"
          height="15"
          viewBox="0 0 20 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M6.35588 11.8345L1.61455 7.17002L0 8.7472L6.35588 15L20 1.57718L18.3968 0L6.35588 11.8345Z"
            fill="black"
          />
        </svg>
        <span className="text-base">10,000 requests/month</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <svg
          width="20"
          height="15"
          viewBox="0 0 20 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M6.35588 11.8345L1.61455 7.17002L0 8.7472L6.35588 15L20 1.57718L18.3968 0L6.35588 11.8345Z"
            fill="black"
          />
        </svg>
        <span className="text-base">Basic in app support</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <svg
          width="20"
          height="15"
          viewBox="0 0 20 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M6.35588 11.8345L1.61455 7.17002L0 8.7472L6.35588 15L20 1.57718L18.3968 0L6.35588 11.8345Z"
            fill="black"
          />
        </svg>
        <span className="text-base">2 users on your account</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <svg
          width="20"
          height="15"
          viewBox="0 0 20 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M6.35588 11.8345L1.61455 7.17002L0 8.7472L6.35588 15L20 1.57718L18.3968 0L6.35588 11.8345Z"
            fill="black"
          />
        </svg>
        <span className="text-base">1 workspace</span>
      </div>

      <motion.button
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="w-full py-4 mt-8 font-semibold bg-black text-white rounded-lg uppercase"
      >
        Sign up free
      </motion.button>
    </div>

    {/* PRO  */}
    <div className="w-full bg-white p-6 border-[1px] border-slate-300 rounded-xl">
      <p className="text-2xl font-bold mb-2">Professional</p>
      <p className="text-lg mb-6">Everything to launch</p>
      <div className="overflow-hidden mb-8">
        <AnimatePresence mode="wait">
          {selected === "M" ? (
            <motion.p
              key="monthly1"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ ease: "linear", duration: 0.25 }}
              className="text-6xl font-bold text-indigo-500"
            >
              <span>$49</span>
              <span className="font-normal text-xl">/month</span>
            </motion.p>
          ) : (
            <motion.p
              key="monthly2"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ ease: "linear", duration: 0.25 }}
              className="text-6xl font-bold text-indigo-500"
            >
              <span>$39</span>
              <span className="font-normal text-xl">/month</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <svg
          width="20"
          height="15"
          viewBox="0 0 20 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M6.35588 11.8345L1.61455 7.17002L0 8.7472L6.35588 15L20 1.57718L18.3968 0L6.35588 11.8345Z"
            fill="black"
          />
        </svg>
        <span className="text-base">100,000 requests/month</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <svg
          width="20"
          height="15"
          viewBox="0 0 20 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M6.35588 11.8345L1.61455 7.17002L0 8.7472L6.35588 15L20 1.57718L18.3968 0L6.35588 11.8345Z"
            fill="black"
          />
        </svg>
        <span className="text-base">Email in app support</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <svg
          width="20"
          height="15"
          viewBox="0 0 20 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M6.35588 11.8345L1.61455 7.17002L0 8.7472L6.35588 15L20 1.57718L18.3968 0L6.35588 11.8345Z"
            fill="black"
          />
        </svg>
        <span className="text-base">10 users on your account</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <svg
          width="20"
          height="15"
          viewBox="0 0 20 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M6.35588 11.8345L1.61455 7.17002L0 8.7472L6.35588 15L20 1.57718L18.3968 0L6.35588 11.8345Z"
            fill="black"
          />
        </svg>
        <span className="text-base">10 work spaces</span>
      </div>

      <motion.button
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="w-full py-4 mt-8 font-semibold bg-indigo-500 text-white rounded-lg uppercase"
        onClick={() => {
          openSubscriptionCheckout(
            "pri_01jcwhgjgg5h8bc9j5hf52hdpn",
            "loejstarc@gmail.com"
          )
        }}
      >
        Subscribe Now
      </motion.button>
    </div>
  </div>
)

const TopLeftCircle = () => {
  return (
    <motion.div
      initial={{ rotate: "0deg" }}
      animate={{ rotate: "360deg" }}
      transition={{ duration: 100, ease: "linear", repeat: Infinity }}
      className="w-[450px] h-[450px] rounded-full border-2 border-slate-500 border-dotted absolute z-0 -left-[250px] -top-[200px]"
    />
  )
}

const BottomRightCircle = () => {
  return (
    <motion.div
      initial={{ rotate: "0deg" }}
      animate={{ rotate: "-360deg" }}
      transition={{ duration: 100, ease: "linear", repeat: Infinity }}
      className="w-[450px] h-[450px] rounded-full border-2 border-slate-500 border-dotted absolute z-0 -right-[250px] -bottom-[200px]"
    />
  )
}
