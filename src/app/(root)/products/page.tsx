'use client';

import ProductComponent from "@/components/products/productComponent";
import ProductNavigation from "@/components/products/productNavigation";
import { useEffect, useState } from "react";
import { addToCart } from "@/lib/cart-utils";

export default function Page(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [productData, setProductData] = useState([{}])
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedDropdownOption, setSelectedDropdownOption] = useState('Featured')

  useEffect(() => {
    //Add the logic for fetching the products from the DB
    const getAllProducts = async () => {
      const data = await fetch('/api/product');
      console.log(data)
      const products = await data.json();
      setProductData(() => products)
    }
    getAllProducts();
  }, [])

  const addToSessionCart = async (productId: string) => {
    addToCart(productId);
  }


  return (
    <main className="flex flex-col justify-center items-center">
      <h1>Best selling Creative</h1>
      <h1>Illustration & Animation sets</h1>
      <h4 className="text-xl text-secondary-text">Extensive amount of file formats, compatible with all design software.</h4>
      <div className="w-full px-20">
        <ProductNavigation activeCategory={activeCategory} setActiveCategory={setActiveCategory} searchQuery={searchQuery} setSearchQuery={setSearchQuery} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} selectedDropdownOption={selectedDropdownOption} setSelectedDropdownOption={setSelectedDropdownOption} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 w-full gap-6 px-20">
        {productData.length > 0 && productData.map((data, index) => (
          <ProductComponent key={index} {...data} addToSessionCart={addToSessionCart} />
        ))}
      </div>
    </main>
  );
}
