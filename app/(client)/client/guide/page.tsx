"use client";
import { useClipboard, usePermission } from "@reactuses/core";
import Step from "./components/Step";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { shopifyCodeAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [text, copy] = useClipboard();
  const [text2, copy2] = useClipboard();
  const permissionRead = usePermission("clipboard-read");
  const permissionWrite = usePermission("clipboard-write");
  const [code, setCode] = useState<string>("");

  async function handleShopifyCode() {
    await shopifyCodeAction({ code });
    router.push("/client/orders");
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
        Shopify guide
      </h1>
      {/* STEP 1 */}
      <Step
        number={1}
        title="Open the Admin Panel of your Shopify Store and click on Settings."
        alt="Shopify Guide 1"
        image={"/assets/images/Shopify Guide 1.png"}
      />
      {/* STEP 2 */}
      <Step
        number={2}
        title="Scroll down and click on Notifications."
        alt="Shopify Guide 2"
        image={"/assets/images/Shopify Guide 2.png"}
      />
      {/* STEP 3 */}
      <Step
        number={3}
        title={`Scroll to the bottom of the page and click on "Create Webhook".`}
        alt="Shopify Guide 3"
        image={"/assets/images/Shopify Guide 3.png"}
      />
      {/* STEP 4 */}
      <Step
        number={4}
        title={`Make sure to choose "Order Creation" in the "Event" field, and the "Webhook API Version" should be the one with "(latest)" in it.`}
        alt="Shopify Guide 4"
        image={"/assets/images/Shopify Guide 4.png"}
      >
        <ul className="flex flex-col list-disc pl-5 text-xs lg:text-sm">
          <li>
            <div className="flex flex-col gap-1">
              <span>{`In the URL field paste Turuq's webhook URL and make sure to copy it without any spaces or extra characters.`}</span>
              <div className="bg-white/20 p-1">
                <code className="rounded-xl flex items-center justify-between">
                  <span className="overflow-x-scroll lg:overflow-x-hidden max-w-[80%]">
                    {`https://api.turuq.co/webhooks/shopify/add/65930c14344347410b7c643a`}
                  </span>
                  <button
                    onClick={() =>
                      copy(
                        "https://api.turuq.co/webhooks/shopify/add/65930c14344347410b7c643a"
                      )
                    }
                  >
                    {text ? (
                      <CopyCheckIcon className="size-4 text-accent" />
                    ) : (
                      <CopyIcon className="size-4 text-accent" />
                    )}
                  </button>
                </code>
              </div>
            </div>
          </li>
          <li>
            <div className="flex flex-col gap-1">
              <span>
                {" "}
                {`Repeat this step one more time but choosing "Order Cancellation" instead of "Order Creation" and use this as the url for it`}
              </span>
              <div className="bg-white/20 p-1">
                <code className="rounded-xl flex items-center justify-between">
                  <span className="overflow-x-scroll lg:overflow-x-hidden max-w-[80%]">
                    {`https://api.turuq.co/webhooks/shopify/cancel/65930c14344347410b7c643a`}
                  </span>
                  <button
                    onClick={() =>
                      copy2(
                        "https://api.turuq.co/webhooks/shopify/cancel/65930c14344347410b7c643a"
                      )
                    }
                  >
                    {text2 ? (
                      <CopyCheckIcon className="size-4 text-accent" />
                    ) : (
                      <CopyIcon className="size-4 text-accent" />
                    )}
                  </button>
                </code>
              </div>
            </div>
          </li>
        </ul>
      </Step>
      {/* STEP 5 */}
      <Step
        number={5}
        title={`Finally, you should see the webhook like the one in the image below. Now copy the code marked in red in this image and paste it in the text field at the end of this page and click "Submit".`}
        alt="Shopify Guide 5"
        image={"/assets/images/Shopify Guide 5.png"}
      />
      <div className="flex items-center justify-between gap-5">
        <Input
          type="text"
          placeholder="Paste the code here"
          className="text-accent placeholder:text-accent/50"
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          className="w-auto h-10 rounded-xl bg-accent text-white px-2 flex items-center justify-center disabled:bg-gray-400"
          onClick={handleShopifyCode}
          disabled={!code}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
