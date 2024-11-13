'use client';
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, PasswordInput } from "../ui";
import { toast } from "sonner";

export const SecurityTab = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    const [error, setError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation to check if new passwords match
        if (formData.newPassword !== formData.confirmNewPassword) {
            toast.error("New passwords do not match.")
            return;
        }

        setError("");

        try {
            const response = await fetch(`/api/user/?id=${session.user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Password updated successfully!");
                setFormData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
                signOut();
            } else {
                toast(result.error || "Password update failed.");
            }
        } catch (error) {
            setError("An error occurred while updating the password.");
            console.log(error)
        }
    };

    return (
        <div className="ml-10 bg-white py-8 px-14 rounded-3xl shadow-md w-full max-w-lg">
            <p className="text-2xl font-medium mb-4">Update Your Password</p>
            <p className="text-md font-extralight mb-8 text-secondary-text w-[21rem]">
                You can update your password below. If you forgot your current password, please contact support for assistance.
            </p>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="space-y-9">            
                <PasswordInput
                    placeholder="Current Password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                />
                <PasswordInput
                    placeholder="New Password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                />
                <PasswordInput
                    placeholder="Confirm New Password"
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleInputChange}
                />
            
                <Button className="w-full" size="lg" type="button" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </div>
        </div>
    );
};
