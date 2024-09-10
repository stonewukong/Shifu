"use client";
import { signupAction } from "@/actions/signup-action";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { useFormStatus } from "react-dom";
import { FaGithub } from "react-icons/fa6";
import { ThreeDots } from "react-loader-spinner";

const page = () => {
  const status = useFormStatus();
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8",
        )}
      >
        Login
      </Link>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>
          <div className="grid gap-6">
            <form action={signupAction}>
              <div className="grid gap-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="e.g. potatobangbang"
                      type="text"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className={`w-full ${status.pending ? "pointer-events-none opacity-50" : ""}`}
                  >
                    {status.pending ? (
                      <>
                        <span className="mr-2">Signing up</span>
                        <ThreeDots
                          visible={true}
                          height="20"
                          width="20"
                          color="#fff"
                          radius="9"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      </>
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                </div>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <button
              type="button"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <FaGithub className="mr-1" /> Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
