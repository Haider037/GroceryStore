"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import axios from "axios";

const SignUpForm = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const signupSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Number must be at least 10 digits long"),
    password: z.string().min(7, "Password must be at leat 7 characters"),
    confirmPassword: z.string().min(7, "Password must be at leat 7 characters"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });

  const hanldeSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    const checkData = signupSchema.parse({firstName, lastName, username, email, phoneNumber, password, confirmPassword});

    try {
      setError(null);
      const response = await axios.post("http://localhost:5058/api/user/create", checkData) 

      if (response.status !== 200) {
        throw new Error("Faild to sign up. Please try again.");
      }
      console.log("Sign in successful");
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <form
      className="w-[35rem] p-14 text-center rounded-xl text-white"
      onSubmit={hanldeSignUp}
    >
      <h1 className="font-bold text-3xl mb-5">Welcome to ShopQuik!</h1>
      {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
      <div className="mb-2">
        <h3 className="text-zinc-200 text-sm text-left">First Name:</h3>
        <input
          className="bg-zinc-100 outline p-2 rounded-xl w-full text-zinc-900"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <h3 className="text-zinc-200 text-sm text-left">Last Name:</h3>
        <input
          className="bg-zinc-100 outline p-2 rounded-xl w-full text-zinc-900"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <h3 className="text-zinc-200 text-sm text-left">Username:</h3>
        <input
          className="bg-zinc-100 outline p-2 rounded-xl w-full text-zinc-900"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <h3 className="text-zinc-200 text-sm text-left">Email:</h3>
        <input
          className="bg-zinc-100 outline p-2 rounded-xl w-full text-zinc-900"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <h3 className="text-zinc-200 text-sm text-left">Phone Number:</h3>
        <input
          className="bg-zinc-100 outline p-2 rounded-xl w-full text-zinc-900"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <h3 className="text-zinc-200 text-sm text-left">Password:</h3>
        <input
          className="bg-zinc-100 outline p-2 rounded-xl w-full text-zinc-900"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <h3 className="text-zinc-200 text-sm text-left">Comfirm Password:</h3>
        <input
          className="bg-zinc-100 outline p-2 rounded-xl w-full text-zinc-900"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button
        className="bg-violet-500 rounded-3xl font-bold w-32 p-2 mt-4 mb-6"
        type="submit"
      >
        Sign Up
      </button>
      <div className=" flex flex-row justify-center gap-1">
        <p>Already have an account?</p>
        <Link href="/login" className="text-blue-500 font-semibold">
          Log In
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
