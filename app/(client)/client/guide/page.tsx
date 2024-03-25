"use client";
import { useClipboard, usePermission } from "@reactuses/core";
// import Step from "./components/Step";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { shopifyCodeAction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

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
    <div className="grid grid-cols-3 gap-5">
      {/*<h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">*/}
      {/*  Shopify guide*/}
      {/*</h1>*/}
      <div className={"col-span-2 flex flex-col"}>
        <Breadcrumb className={"mb-5"}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Shopify Integration</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className={"font-bold"}>Webhooks</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className={"text-3xl font-bold"}>Webhooks</h1>
        <p className={"text-black/50 text-sm capitalize"}>
          How to Integrate your Shopify Store Orders with Turuq
        </p>
        <div className={"flex flex-col text-sm font-semibold gap-5 my-5"}>
          <p className={"text-pretty"}>
            {
              "Integrating your Shopify store with Turuq through webhooks streamlines order management, offers you greater visibility, and empowers you to fulfill orders efficiently."
            }
          </p>
          <p>This integration offers a range of benefits:</p>
          <h3 className={"text-base font-bold"}>Enhanced Order Tracking</h3>
          <p>
            You can effortlessly monitor the status of your orders directly from
            your account, providing a superior customer experience.
          </p>
          <h3 className={"text-base font-bold"}>Turuq Fulfillment</h3>
          <p>
            {
              "Leverage Turuq's fulfillment services to ensure efficient and reliable delivery of your orders."
            }
          </p>
          <h3 className={"text-base font-bold"}>Webhook Advantages</h3>
          <p>
            {
              "Webhooks enable real-time data exchange between your Shopify store and Turuq. This allows for:"
            }
          </p>
          <ul className={"list-disc pl-5"}>
            <li className={"text-balance"}>
              Automatic order updates in your app, reflecting the latest status
              within Shopify.
            </li>
            <li className={"text-balance"}>
              Triggering actions within Turuq based on specific order events
              (e.g., initiating fulfillment upon order creation).
            </li>
          </ul>
          <h1 id={"order-creation"} className={"text-3xl font-bold"}>
            Order Creation
          </h1>
          <h3 className={"text-sm"}>
            {
              "Open The Admin Panel of Your Shopify Store and Click on Settings."
            }
          </h3>
          <img
            src={"/assets/images/Shopify Guide 1.png"}
            alt={"step-1-order-creation"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
          <h3 className={"text-sm"}>
            {"Scroll Down and Click on Notifications."}
          </h3>
          <img
            src={"/assets/images/Shopify Guide 2.png"}
            alt={"step-2-order-creation"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
          <h3 className={"text-sm"}>
            {`Scroll to The Bottom of The Page and Click on "Create Webhook".`}
          </h3>
          <img
            src={"/assets/images/Shopify Guide 3.png"}
            alt={"step-3-order-creation"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
          <h3 className={"text-sm text-pretty"}>
            {`Make Sure to Choose "Order Creation" in The "Event" Field, and The "Webhook API Version" Should Be The One With "(latest)" in It.`}
          </h3>
          <img
            src={"/assets/images/Shopify Guide 4.png"}
            alt={"step-4-order-creation"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
          <p>{`To ensure proper integration, please ensure Turuq's webhook URL is pasted into the designated field without any leading or trailing spaces or extraneous characters.`}</p>
          <code className="rounded-xl bg-black/10 py-1 px-2 flex items-center justify-between">
            <span className="overflow-x-scroll lg:overflow-x-hidden max-w-[80%]">
              {`https://api.turuq.co/webhooks/shopify/add/65930c14344347410b7c643a`}
            </span>
            <button
              onClick={() =>
                copy(
                  "https://api.turuq.co/webhooks/shopify/add/65930c14344347410b7c643a",
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
          <h1 id={"order-deletion"} className={"text-3xl font-bold"}>
            Order Deletion
          </h1>
          <p>{`Once you've completed these steps, you can set up another webhook to track order cancellations. Simply go through the same process again, but this time choose "Order Cancellation" instead of "Order Creation".`}</p>
          <p>{`To ensure proper integration, please ensure Turuq's webhook URL is pasted into the designated field without any leading or trailing spaces or extraneous characters.`}</p>
          <code className="rounded-xl bg-black/10 py-1 px-2 flex items-center justify-between">
            <span className="overflow-x-scroll lg:overflow-x-hidden max-w-[80%]">
              {`https://api.turuq.co/webhooks/shopify/cancel/65930c14344347410b7c643a`}
            </span>
            <button
              onClick={() =>
                copy(
                  "https://api.turuq.co/webhooks/shopify/cancel/65930c14344347410b7c643a",
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
          <h1 id={"link-webhook"} className={"text-3xl font-bold"}>
            Link Webhook
          </h1>
          <h3 className={"text-sm text-pretty"}>
            {`To complete the integration, locate the webhook URL within the configuration settings illustrated below. This URL will be highlighted in red for your reference. Once identified, simply copy the URL and paste it into the designated text field provided at the bottom of this page. Click "Submit" to finalize the connection with your Shopify store.`}
          </h3>
          <img
            src={"/assets/images/Shopify Guide 5.png"}
            alt={"step-5-order-creation"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
        </div>
        <div className="flex items-center justify-between gap-5">
          <Input
            type="text"
            placeholder="Paste the code here"
            className="text-accent placeholder:text-accent/50 border-none bg-white drop-shadow-md"
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
      <div className={"col-span-1 flex flex-col gap-5"}>
        <div className={"flex flex-col gap-5 p-1 mr-10"}>
          <h1 className={"text-sm font-bold text-black"}>On This Page</h1>
          <Link
            href={"/client/guide/#order-creation"}
            className={"text-black/50 hover:text-black text-sm font-semibold"}
          >
            Order Creation
          </Link>
          <Link
            href={"/client/guide/#order-deletion"}
            className={"text-black/50 hover:text-black text-sm font-semibold"}
          >
            Order Deletion
          </Link>
          <Link
            href={"/client/guide/#link-webhook"}
            className={"text-black/50 hover:text-black text-sm font-semibold"}
          >
            Link Webhook
          </Link>
        </div>
      </div>
      {/* STEP 1 */}
      {/*<Step*/}
      {/*  number={1}*/}
      {/*  title="Open the Admin Panel of your Shopify Store and click on Settings."*/}
      {/*  alt="Shopify Guide 1"*/}
      {/*  image={"/assets/images/Shopify Guide 1.png"}*/}
      {/*/>*/}
      {/*/!* STEP 2 *!/*/}
      {/*<Step*/}
      {/*  number={2}*/}
      {/*  title="Scroll down and click on Notifications."*/}
      {/*  alt="Shopify Guide 2"*/}
      {/*  image={"/assets/images/Shopify Guide 2.png"}*/}
      {/*/>*/}
      {/*/!* STEP 3 *!/*/}
      {/*<Step*/}
      {/*  number={3}*/}
      {/*  title={`Scroll to the bottom of the page and click on "Create Webhook".`}*/}
      {/*  alt="Shopify Guide 3"*/}
      {/*  image={"/assets/images/Shopify Guide 3.png"}*/}
      {/*/>*/}
      {/*/!* STEP 4 *!/*/}
      {/*<Step*/}
      {/*  number={4}*/}
      {/*  title={`Make sure to choose "Order Creation" in the "Event" field, and the "Webhook API Version" should be the one with "(latest)" in it.`}*/}
      {/*  alt="Shopify Guide 4"*/}
      {/*  image={"/assets/images/Shopify Guide 4.png"}*/}
      {/*>*/}
      {/*  <ul className="flex flex-col list-disc pl-5 text-xs lg:text-sm">*/}
      {/*    <li>*/}
      {/*      <div className="flex flex-col gap-1">*/}
      {/*        <span>{`In the URL field paste Turuq's webhook URL and make sure to copy it without any spaces or extra characters.`}</span>*/}
      {/*        <div className="bg-white/20 p-1">*/}
      {/*          <code className="rounded-xl flex items-center justify-between">*/}
      {/*            <span className="overflow-x-scroll lg:overflow-x-hidden max-w-[80%]">*/}
      {/*              {`https://api.turuq.co/webhooks/shopify/add/65930c14344347410b7c643a`}*/}
      {/*            </span>*/}
      {/*            <button*/}
      {/*              onClick={() =>*/}
      {/*                copy(*/}
      {/*                  "https://api.turuq.co/webhooks/shopify/add/65930c14344347410b7c643a",*/}
      {/*                )*/}
      {/*              }*/}
      {/*            >*/}
      {/*              {text ? (*/}
      {/*                <CopyCheckIcon className="size-4 text-accent" />*/}
      {/*              ) : (*/}
      {/*                <CopyIcon className="size-4 text-accent" />*/}
      {/*              )}*/}
      {/*            </button>*/}
      {/*          </code>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <div className="flex flex-col gap-1">*/}
      {/*        <span>*/}
      {/*          {" "}*/}
      {/*          {`Repeat this step one more time but choosing "Order Cancellation" instead of "Order Creation" and use this as the url for it`}*/}
      {/*        </span>*/}
      {/*        <div className="bg-white/20 p-1">*/}
      {/*          <code className="rounded-xl flex items-center justify-between">*/}
      {/*            <span className="overflow-x-scroll lg:overflow-x-hidden max-w-[80%]">*/}
      {/*              {`https://api.turuq.co/webhooks/shopify/cancel/65930c14344347410b7c643a`}*/}
      {/*            </span>*/}
      {/*            <button*/}
      {/*              onClick={() =>*/}
      {/*                copy2(*/}
      {/*                  "https://api.turuq.co/webhooks/shopify/cancel/65930c14344347410b7c643a",*/}
      {/*                )*/}
      {/*              }*/}
      {/*            >*/}
      {/*              {text2 ? (*/}
      {/*                <CopyCheckIcon className="size-4 text-accent" />*/}
      {/*              ) : (*/}
      {/*                <CopyIcon className="size-4 text-accent" />*/}
      {/*              )}*/}
      {/*            </button>*/}
      {/*          </code>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</Step>*/}
      {/*/!* STEP 5 *!/*/}
      {/*<Step*/}
      {/*  number={5}*/}
      {/*  title={`Finally, you should see the webhook like the one in the image below. Now copy the code marked in red in this image and paste it in the text field at the end of this page and click "Submit".`}*/}
      {/*  alt="Shopify Guide 5"*/}
      {/*  image={"/assets/images/Shopify Guide 5.png"}*/}
      {/*/>*/}
    </div>
  );
}
