'use client';
import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, InputWithLabel } from "../ui";
import { toast } from "sonner";

export const ProfileTab = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", displayName: "" });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Set initial form data once session is loaded
    useEffect(() => {
        if (session) {
            setFormData({
                firstName: session?.user?.firstName!==null?session?.user?.firstName:session?.user?.name.split(" ")[0] || "",
                lastName: session?.user?.lastName!==null?session?.user?.lastName:session?.user?.name.split(" ")[1] || "",
                email: session?.user?.email || "",
                displayName: session?.user?.displayName!==null?session?.user?.displayName:session?.user?.name.split(" ")[0] || "",
            });
        }
    }, [session]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            // Call the update API
            const response = await fetch(`/api/user?id=${session?.user?.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const resData = await response.json();
                throw new Error(resData.error || 'Failed to update user data');
            }

            toast.success("Profile updated successfully!");
            router.refresh(); // Refresh the session to fetch the updated data

        } catch (error: any) {
            setError(error.message);
            toast.error("Failed to update profile.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="ml-10 bg-white py-8 px-14 rounded-3xl shadow-md w-full max-w-lg">
            <p className="text-2xl font-medium mb-8">Details</p>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="space-y-9">
                <InputWithLabel
                    label="First Name"
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                <InputWithLabel
                    label="Last Name"
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
                <InputWithLabel
                    label="Email"
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <InputWithLabel
                    label="Display Name"
                    placeholder="Display Name"
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                />
            
                <Button 
                    className="w-full" 
                    size="lg" 
                    type="button" 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </div>
    );
};
