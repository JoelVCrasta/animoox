"use client";
import { useSession } from "next-auth/react";
import { InputWithLabel } from "../ui";
import { Button } from "../ui";
import { toast } from "sonner";

export const PaymentMethodsTab = () => {
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("functionality in dev")
  };
  
  return (
    <div className="ml-10 bg-white py-8 px-14 rounded-3xl shadow-md w-full max-w-lg">
      <p className="text-2xl font-medium mb-4">Add new Card</p>
      <p className="text-md font-extralight mb-8 text-secondary-text w-[21rem]">Add a new card for future purchases and enable a more seamless shopping experience. Your card details are secured and encrypted by Stripe.</p>

      <div className="">
        <InputWithLabel
          label="Card Information"
          placeholder="John Doe"
          type="text"
          name="cardholderName"
          className="border-2 border-b-0"
        />
      </div>
      <div className="">
        <InputWithLabel
          label=""
          placeholder="1234 1234 1234 1234"
          type="email"
          name="email"
          className="border-2 border-b-0"
        />
      </div>
      <div className="flex">
        <InputWithLabel
          label=""
          placeholder="designer@example.com"
          type="date"
          name="date"
          className="rounded-r-none"
        />
        <InputWithLabel
          label=""
          placeholder="CVC"
          type="date"
          name="date"
          className="rounded-l-none border-l-0"
        />
      </div>

      <Button className="w-full mt-5" size="lg" type="button" onClick={handleSubmit}>Save Changes</Button>
    </div>
  );
};
