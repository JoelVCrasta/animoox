'use client'
import { useSession } from "next-auth/react"
import { Button } from "../ui"
import {toast} from "sonner"

export const DeleteAccountTab=()=>{
    const {data:session}=useSession()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        toast.info("functionality in dev")
    };

    return(
        <div className="ml-10 bg-white py-8 px-14 rounded-3xl shadow-md w-full max-w-lg">
            <p className="text-2xl font-medium mb-4">Details</p>
            <p className="text-md font-extralight mb-8 text-secondary-text w-[21rem]">Permanently deleting your account and all data associated with it is a manual process performed on our end.</p>
            <p className="text-md font-extralight mb-8 text-secondary-text w-[21rem]">Please contact support with the email address associated with the account you wish to delete for assistance.</p>
            <Button className="w-full mt-5" size="lg" type="button" onClick={handleSubmit}>Contact Support</Button>
        </div>
    )
}