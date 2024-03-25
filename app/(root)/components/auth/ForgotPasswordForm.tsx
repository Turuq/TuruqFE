"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/custom/auth-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  passwordVerificationCodeAction,
  resetPasswordAction,
  verifyCodeAction,
} from "@/lib/actions";
import Image from "next/image";
import { useState } from "react";

export default function ForgotPasswordForm({
  changeView,
}: {
  changeView: (value: "login" | "register" | "forgot") => void;
}) {
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [formError, setFormError] = useState({ error: false, message: "" });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");

  async function handleSendCode() {
    const { error, message } = await passwordVerificationCodeAction({ email });
    if (error) {
      setFormError({ error: true, message: message ?? "" });
      return;
    } else {
      setCodeSent(true);
    }
  }

  async function handleCodeVerification() {
    const { error, message } = await verifyCodeAction({
      email,
      code: parseInt(verificationCode),
    });
    if (error) {
      setFormError({ error: true, message: message ?? "" });
      return;
    } else {
      setReset(true);
    }
  }

  async function handlePasswordReset() {
    const { error, message } = await resetPasswordAction({
      email,
      password,
      code: parseInt(verificationCode),
    });
    if (error) {
      setFormError({ error: true, message: message ?? "" });
      return;
    } else {
      changeView("login");
    }
  }

  return (
    <DialogContent className="flex flex-col gap-10 items-start w-full lg:max-w-xl">
      <DialogHeader className="w-full">
        <div className="flex items-center justify-center">
          <Image
            src={"/assets/images/dark blue logo.png"}
            alt="Turuq.co"
            width={80}
            height={80}
            priority
            aria-label="Turuq"
            className="w-20 h-auto"
          />
        </div>
        <DialogTitle className="uppercase text-accent font-bold lg:text-base text-sm flex justify-center">
          reset your password
        </DialogTitle>
        <DialogDescription>
          {formError.error && (
            <Alert className="bg-red-500 text-white border-red-500">
              <AlertTitle className="capitalize">
                Unable to Reset Password
              </AlertTitle>
              <AlertDescription>{formError.message}</AlertDescription>
            </Alert>
          )}
        </DialogDescription>
      </DialogHeader>
      {!codeSent && !reset ? (
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-1 col-span-12 w-full text-accent">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Please Enter The Email Associated With Your Account"
              className="text-accent placeholder:text-accent/50"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              className="w-auto h-10 bg-accent text-white rounded-xl px-2"
              onClick={handleSendCode}
            >
              Send Verification Code
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p
              className="capitalize text-accent/80 text-sm hover:underline cursor-pointer"
              onClick={() => changeView("login")}
            >
              Back to sign in?
            </p>
          </div>
        </div>
      ) : codeSent && !reset ? (
        <div className="flex flex-col gap-5 w-full">
          <h3 className="text-accent">
            Please check your email for the verification code
          </h3>
          <div className="flex items-center gap-5">
            <InputOTP
              maxLength={6}
              value={verificationCode}
              onChange={(value) => setVerificationCode(value)}
              render={({ slots }) => (
                <div className={"flex gap-1 items-center"}>
                  {slots.map((slot, index) => (
                    <div key={index} className={"flex items-center gap-1"}>
                      <InputOTPGroup>
                        <InputOTPSlot
                          {...slot}
                          className={"border-accent text-accent"}
                        />
                      </InputOTPGroup>
                      {index !== 5 && (
                        <InputOTPSeparator className={"text-accent"} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
          <div className="flex items-center">
            <button
              className="bg-accent text-white w-40 h-10 px-2 rounded-xl capitalize"
              onClick={handleCodeVerification}
            >
              confirm code
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-1 col-span-12 w-full text-accent">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Please Enter Your New Password"
              className="text-accent placeholder:text-accent/50"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              className="w-auto h-10 bg-accent text-white rounded-xl px-2"
              onClick={handlePasswordReset}
            >
              Reset Password
            </button>
          </div>
        </div>
      )}
    </DialogContent>
  );
}
