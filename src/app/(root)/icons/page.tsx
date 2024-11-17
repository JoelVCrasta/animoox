'use client'
import { useState, useEffect, useRef, useCallback } from "react"
import { Input, Button } from "@/components/ui"
import { HeaderDropdownIcon } from "@/assets/icons/header-dropdown-icon"
import { ProductivityBottomRightIcon, ProductivityLeftIcon, ProductivityTopRightIcon, SearchIcon } from "@/assets/icons"
import { PaddleLogo, ProductivityLeft, ProductivityRight } from "@/assets/images"
import Image from "next/image"
import { Etablir, Goddady, Ibm, KickBoost, LottieFiles, Perigon, Plume, Socrates, Sturdy, Synopsys, Syntrum, TripleWhale, ProductivityLogo } from "@/assets/images"
import { ProductivityStar, ProductivityRect, ProductivityOval } from "@/assets/images"
import { FaqIcon } from "@/assets/icons/faq-icon"
import FAQAccordion from "@/components/accordian"

const categories = [
  {
    name: "All",
    count: 5740
  },
  {
    name: "Animation",
    count: 5740
  },
  {
    name: "Icons",
    count: 4320
  },
  {
    name: "Illustrations",
    count: 3890
  },
  {
    name: "3D",
    count: 2150
  },
  {
    name: "Motion Graphics",
    count: 1980
  },
  {
    name: "Characters",
    count: 1540
  },
  {
    name: "Backgrounds",
    count: 1230
  },
  {
    name: "Logos",
    count: 980
  },
  {
    name: "UI Elements",
    count: 850
  },
  {
    name: "Patterns",
    count: 620
  },
  {
    name: "Textures",
    count: 480
  }
]

const stroke = [ 
  'Light',
  'Regular',
  'Bold '
]

export default function Page(): JSX.Element {
  const [iconType, setIconType] = useState<string>("3D")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedStroke, setSelectedStroke] = useState<string>("Light")

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="relative w-full px-[30rem] my-12">
        <Button
          className="py-1 px-5 border-r-black font-normal flex justify-start items-center gap-2 absolute top-[12px] left-[31rem] rounded-none"
          size="lg"
          variant="ghost"
        >
          <p className="text-black">All Items</p>
          <HeaderDropdownIcon />
        </Button>
        <Input type="text" className="rounded-full border-none px-[11rem] py-4" placeholder="Search lottie animation illustration or icon"/>
        <Button
          className="py-3 rounded-full px-5 bg-brand font-normal flex justify-start items-center gap-2 absolute top-[3px] right-[30.5rem]"
          size="lg"
          variant="ghost"
        >
          <SearchIcon fill="none" stroke="white"/>
          <p className="text-white">Search</p>
        </Button>
      </div>

      <div className="w-full grid grid-cols-12 border border-t-[whitesmoke]">
        <div className="leftbar col-span-2 border-r">
          <section className="w-full px-5 py-6 border">
            <div className="flex justify-between items-center  font-extralight">
              <p className="text-lg font-extralight text-secondary-text">FAVORITE</p>
              <p className="text-lg font-extralight text-secondary-text">+</p>
            </div>
          </section>

          <section className="w-full px-5 py-3">
            <p className="text-lg font-extralight text-secondary-text">ICONS</p>
            <div className="flex justify-between items-center  font-extralight">
              <Button variant="ghost" size="default" className={`font-extralight border- px-6 ${iconType === "Flat" ? "bg-white text-black shadow-lg" : "bg-transparent text-black "}`} onClick={() => setIconType("Flat")}>Flat</Button>
              <Button variant="ghost" size="default" className={`font-extralight border- px-6 ${iconType === "Motion" ? "bg-white text-black shadow-lg" : "bg-transparent text-black"}`} onClick={() => setIconType("Motion")}>Motion</Button>
              <Button variant="ghost" size="default" className={`font-extralight border- px-6 ${iconType === "3D" ? "bg-white text-black shadow-lg" : "bg-transparent text-black"}`} onClick={() => setIconType("3D")}>3D</Button>
            </div>
          </section>

          <section className="w-full px-5 py-6 border">
            <div className="flex justify-between items-center  font-extralight">
              <p className="text-lg font-extralight text-secondary-text">LICENSE</p>
              <p className="text-lg font-extralight text-secondary-text">+</p>
            </div>
          </section>


          <section className="w-full px-5 py-3">
            <p className="text-lg font-extralight text-secondary-text">CATEGORIES</p>
            <div className="p-3">
              {categories.map((category) => (
                <div className={`flex justify-between items-center font-extralight p-2 rounded-lg ${selectedCategory === category.name ? "bg-white text-black" : "bg-transparent text-black"} my-2`} onClick={() => setSelectedCategory(category.name)}>
                  <p className="font-extralight">{category.name}</p>
                  <p className="font-extralight">{category.count}</p>
                </div>
              ))}
            </div>
          </section>


        </div>


        <div className="w-full col-span-8 border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {Array.from({ length: 25 }).map((_, index) => (
            <div key={index} className="bg-white h-48 w-full"></div>
          ))}
        </div>



        <div className="rightbar col-span-2 border">
          <section className="w-full px-5 py-6 border">
            <div className="flex justify-between items-center  font-extralight">
              <p className="text-lg font-extralight text-secondary-text">PHOTO</p>
              <p className="text-lg font-extralight text-secondary-text">+</p>
            </div>
          </section>

          <section className="w-full px-5 py-6 flex justify-center items-center border">
              <div className="bg-secondary-text h-36 w-44 rounded-lg"></div>
          </section>

          <section className="w-full px-5 py-6 border">
            <div className="flex justify-between items-center  font-extralight">
              <p className="text-lg font-extralight text-secondary-text">EDITOR</p>
              <p className="text-lg font-extralight text-secondary-text">+</p>
            </div>
            <div className="flex flex-col justify-center items-start font-extralight my-2">
              <p className="text-xs font-extralight text-secondary-text">COLORS</p>
              <div className="flex justify-center items-center gap-2">
                <div className="bg-red-300 h-6 w-6 rounded-md"></div>
                <div className="bg-blue-300 h-6 w-6 rounded-md"></div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-start font-extralight my-5 ">
              <p className="text-xs font-extralight text-secondary-text">STROKE</p>
              <div className="flex justify-center items-center gap-2">
                {stroke.map((stroke) => (
                  <p className={`text-sm w-ful font-extralight border rounded-md px-2 py-1 cursor-pointer ${selectedStroke === stroke ? "bg-white text-brand" : "bg-transparent text-black"}`} onClick={() => setSelectedStroke(stroke)}>{stroke}</p>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center items-start font-extralight my-5 ">
              <p className="text-xs font-extralight text-secondary-text">ANIMATION</p>
              <div className="grid grid-cols-3 items-center gap-2 border w-full p-1 rounded-md">
                <div className="bg-secondary-text h-8 w-12 rounded-md"></div>
                <div className="text-xs font-extralight text-secondary-text">Love Animation</div>
                <div className="text-sm font-extralight text-secondary-text flex justify-end items-center px-2"><HeaderDropdownIcon /></div>
              </div>
            </div>
          </section>

          <div className="w-full h-[200px] flex justify-center items-center">
            <div className="w-full flex justify-center items-center gap-1">
                <Button className="bg-brand hover:bg-white hover:text-brand hover:border-brand text-white py-2 px-5 font-extralight w-full" variant="ghost" size="lg">Export </Button>
              <Button className="bg-brand hover:bg-white hover:text-brand hover:border-brand text-white py-2 px-5 font-extralight" variant="ghost" size="default">:</Button>
            </div>
          </div>
        </div>
      </div>


      <section className="bg-white w-full relative flex flex-col items-center my-28 pt-10 h-[50rem]">
        <Image src={ProductivityLeft} alt="" className="w-[21rem] absolute left-0 top-24 z-20"/>
        <Image src={ProductivityRight} alt="" className="w-[21rem] absolute right-0 top-24 z-20"/>
        <div className="absolute left-80 bottom-0"><ProductivityLeftIcon /></div>
        <div className="absolute top-20 right-0"><ProductivityTopRightIcon /></div>
        <div className="absolute bottom-1 right-80"><ProductivityBottomRightIcon /></div>

        <h1 className="">Boost your productivity, effortlessly.</h1>
        <h4 className="text-md font-extralight text-secondary-text">Unlock everything: Get instant access, daily updates, and stream your workflow.</h4>
        <Button className="bg-brand hover:bg-white hover:text-brand hover:border-brand text-white rounded-full py-4 px-5 my-10" variant="ghost">Unlock All-Access</Button>
        <div className="flex gap-5 items-center">
          <Image src={ProductivityLogo} alt="" className="w-36"/>
          <p className="font-extralight text-secondary-text"> <b className="font-bold text-black">1000+</b> People use animoox daily.</p>
        </div>
        <div className="w-full mt-20 px-[30rem] relative ">
          <div className="relative bg-red-100">
            <Image src={ProductivityStar} alt="" className="absolute left-0 top-0"/>
            <Image src={ProductivityRect} alt="" className="absolute top-0 left-80"/>
            <Image src={ProductivityOval} alt="" className="absolute right-0"/>
          </div>
        </div>
      </section>

      <section className="w-full">
          <div className="flex justify-center items-center">
            <FaqIcon />
          </div>

          <div className=" w-full grid grid-cols-2 px-20 py-28 gap-36">
            <div className="w-full h-full p-10">
              <div className="w-full bg-secondary rounded h-full"></div>
            </div>
            <FAQAccordion />

          </div>
      </section>
    </main>
  )
}