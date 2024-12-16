import { FlipWords } from "@/components/ui/FlipWords";
import Link from "next/link";
import React, { useState } from "react";

export interface User {
  userID: string;
  username: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
  password: string;
  creditcardNumber: string;
  creditcardExpDate: string;
  cvv: number;
  shippingLocation: string;
}

export const getUserInfo = async (id: number): Promise<User> => {
  const response = await fetch(`http://localhost:5058/api/user/id/${id}`);
  const userInfo: User = await response.json();

  return userInfo;
};
const ProfilePage = async () => {
  var id = 1;
  const userInfo = await getUserInfo(id);
  return (
    <div className="bg-zinc-950 text-zinc-100 p-5 w-[30rem] h-full flex flex-col rounded-xl">
      <div className="flex flex-col items-center w-full">
        <h1 className="absolute left-28">
          <Link href="/" className="text-purple-500 font-bold">
            Back to Shopping
          </Link>
        </h1>
        <h1 className="mt-10 text-2xl font-bold mb-2">
          Welcome
          <FlipWords words={["Loyal", "Valued", "Home"]} />
          Customer
        </h1>
      </div>
      <div className=" flex flex-col text-left px-6">
        <div className="">
          <span className="font-bold">Full Name:</span>
          <span className="ml-2">
            {userInfo.firstName} {userInfo.lastName}
          </span>
        </div>
        <div>
          <span className="font-bold">Email Address:</span>
          <span className="ml-2">{userInfo.email}</span>
        </div>
        <div>
          <span className="font-bold">Username:</span>
          <span className="ml-2">{userInfo.username}</span>
        </div>
        <div className="">
          <span className="font-bold">Phone Number:</span>
          <span className="ml-2">{userInfo.phoneNumber}</span>
        </div>
        <div className="">
          <span className="font-bold">Address:</span>
          <span className="ml-2">{userInfo.address}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
