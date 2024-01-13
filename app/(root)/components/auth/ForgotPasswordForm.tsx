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
  passwordVerificationCodeAction,
  resetPasswordAction,
  verifyCodeAction,
} from "@/lib/actions";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ForgotPasswordForm({
  changeView,
}: {
  changeView: (value: "login" | "register" | "forgot") => void;
}) {
  const [codeSent, setCodeSent] = useState<boolean>(true);
  const [reset, setReset] = useState<boolean>(true);
  const [formError, setFormError] = useState({ error: false, message: "" });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [digit1, setDigit1] = useState<number>();
  const [digit2, setDigit2] = useState<number>();
  const [digit3, setDigit3] = useState<number>();
  const [digit4, setDigit4] = useState<number>();
  const [digit5, setDigit5] = useState<number>();
  const [digit6, setDigit6] = useState<number>();

  async function handleSendCode() {
    const { error, message } = await passwordVerificationCodeAction({ email });
    if (error) {
      setFormError({ error: true, message: message ?? "" });
      return;
    } else {
      setCodeSent(true);
    }
  }

  function handleFirstFieldPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.split("");
    const d1 = digits[0];
    const d2 = digits[1];
    const d3 = digits[2];
    const d4 = digits[3];
    const d5 = digits[4];
    const d6 = digits[5];
    setDigit1(parseInt(d1));
    setDigit2(parseInt(d2));
    setDigit3(parseInt(d3));
    setDigit4(parseInt(d4));
    setDigit5(parseInt(d5));
    setDigit6(parseInt(d6));
  }

  async function handleCodeVerification() {
    const code = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`;
    const { error, message } = await verifyCodeAction({
      email,
      code: parseInt(code),
    });
    if (error) {
      setFormError({ error: true, message: message ?? "" });
      return;
    } else {
      setReset(true);
    }
  }

  async function handlePasswordReset() {
    const code = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`;
    const { error, message } = await resetPasswordAction({
      email,
      password,
      code: parseInt(code),
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
              <AlertTitle className="capitalize">Unable to sign in</AlertTitle>
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
            <Input
              type="number"
              id="digit1"
              placeholder=""
              className="text-accent placeholder:text-accent/50 number-field"
              min={0}
              max={9}
              minLength={1}
              maxLength={1}
              value={digit1}
              onPaste={handleFirstFieldPaste}
              onChange={(e) => setDigit1(parseInt(e.target.value))}
            />
            <Input
              type="number"
              id="digit2"
              placeholder=""
              className="text-accent placeholder:text-accent/50 number-field"
              min={0}
              max={9}
              minLength={1}
              maxLength={1}
              value={digit2}
              onChange={(e) => setDigit2(parseInt(e.target.value))}
            />
            <Input
              type="number"
              id="digit3"
              placeholder=""
              className="text-accent placeholder:text-accent/50 number-field"
              min={0}
              max={9}
              minLength={1}
              maxLength={1}
              value={digit3}
              onChange={(e) => setDigit3(parseInt(e.target.value))}
            />
            <Input
              type="number"
              id="digit4"
              placeholder=""
              className="text-accent placeholder:text-accent/50 number-field"
              min={0}
              max={9}
              minLength={1}
              maxLength={1}
              value={digit4}
              onChange={(e) => setDigit4(parseInt(e.target.value))}
            />
            <Input
              type="number"
              id="digit5"
              placeholder=""
              className="text-accent placeholder:text-accent/50 number-field"
              min={0}
              max={9}
              minLength={1}
              maxLength={1}
              value={digit5}
              onChange={(e) => setDigit5(parseInt(e.target.value))}
            />
            <Input
              type="number"
              id="digit6"
              placeholder=""
              className="text-accent placeholder:text-accent/50 number-field"
              min={0}
              max={9}
              minLength={1}
              maxLength={1}
              value={digit6}
              onChange={(e) => setDigit6(parseInt(e.target.value))}
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
