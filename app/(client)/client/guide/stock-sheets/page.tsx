import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className={"col-span-2 flex flex-col"}>
        <Breadcrumb className={"mb-5"}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Shopify Integration</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className={"font-bold"}>
                Stock Sheets
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className={"text-3xl font-bold"}>Generate Stock Sheets</h1>
        <p className={"text-black/50 text-sm capitalize mb-5"}>
          How to Integrate your Shopify Store Products with Turuq to generate
          Stock Sheets
        </p>
        <div className={"space-y-3 font-semibold"}>
          <p>{"Generate product stock sheets effortlessly with Turuq!"}</p>
          <p className={"text-balance"}>
            {
              "Simply connect your Shopify store to Turuq to start creating and managing your stock sheets. Here's how:"
            }
          </p>
          <ul className={"list-disc pl-5"}>
            <li className={"text-balance"}>
              {
                "Seamless Integration: Turuq integrates with your Shopify store through a custom app. This app grants Turuq secure read-only access to your product data using the Shopify API."
              }
            </li>
            <li className={"text-balance"}>
              {
                "Full Control: You provide your store name and a unique access token to establish the connection. This is a one-time process, and you can revoke permissions anytime for maximum security."
              }
            </li>
          </ul>
          <p>{`Don't worry if this sounds technical! We've included a step-by-step guide below to walk you through the integration process and get you started with generating stock sheets in no time.`}</p>
        </div>
        {/*<p*/}
        {/*  className={*/}
        {/*    "text-black text-pretty text-sm my-5 leading-loose font-bold"*/}
        {/*  }*/}
        {/*>*/}
        {/*  {`To generate stock sheets through Turuq, you need to integrate your Shopify store products with Turuq.*/}
        {/*  This involves creating a custom app in your Shopify store and providing the necessary permissions to Turuq to gain read access to your products.*/}
        {/*  Access is granted through the Shopify API, your store name and your custom stores' access token.*/}
        {/*  This is a one-time process and you can revoke the permissions at any time.*/}
        {/*  If you are not sure how to do this, please follow the steps below to integrate your Shopify store with Turuq and generate stock sheets.`}*/}
        {/*</p>*/}
        <div className={"flex flex-col gap-5 mt-5"}>
          <h1 id={"custom-app-creation"} className={"text-3xl font-bold"}>
            Custom App Creation
          </h1>
          <h3 className={"text-sm"}>
            {
              "Open The Admin Panel of Your Shopify Store and Click on Settings > `Apps and sales channels`."
            }
          </h3>
          <img
            src={"/assets/images/Shopify/AccessTokenStep1.png"}
            alt={"Access Token Step 1"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
          <h3 className={"text-sm"}>{"Click on `Develop apps`."}</h3>
          <img
            src={"/assets/images/Shopify/AccessTokenStep2.png"}
            alt={"Access Token Step 2"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
          <h3 className={"text-sm"}>
            {
              "When greeted with the window in the following image, click `Allow custom app development`."
            }
          </h3>
          <img
            src={"/assets/images/Shopify/AccessTokenStep3.png"}
            alt={"Access Token Step 3"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
          <h3 className={"text-sm"}>
            {
              "A disclaimer window similar to the one below will appear, click `Allow custom app development`."
            }
          </h3>
          <img
            src={"/assets/images/Shopify/AccessTokenStep4.png"}
            alt={"Access Token Step 4"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
          <h3 className={"text-sm"}>
            {
              "Once you've granted permission, create your custom app by click `create an app`."
            }
          </h3>
          <img
            src={"/assets/images/Shopify/AccessTokenStep5.png"}
            alt={"Access Token Step 5"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
          <h3 className={"text-sm"}>
            {"In the App name field type `Turuq` and click `Create app`."}
          </h3>
          <img
            src={"/assets/images/Shopify/AccessTokenStep6.png"}
            alt={"Access Token Step 6"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
          <h1 id={"access-scope"} className={"text-3xl font-bold"}>
            Configure Access Scope
          </h1>
          <h3 className={"text-sm"}>
            {
              "Once the App has been created, it's time to configure the access scope to your shopify store."
            }
          </h3>
          <h3 className={"text-sm"}>{"Click on `configuration`."}</h3>
          <img
            src={"/assets/images/Shopify/AccessTokenStep7.png"}
            alt={"Access Token Step 7"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
          <h3 className={"text-sm"}>
            {"Click on `configure` in the `Admin API integration` card."}
          </h3>
          <img
            src={"/assets/images/Shopify/AccessTokenStep7-1.png"}
            alt={"Access Token Step 7"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
          <h3 className={"text-sm"}>
            {
              "Grant `read_product_listings` and `read_products` access from the provided list. Click `Save`."
            }
          </h3>
          <img
            src={"/assets/images/Shopify/AccessTokenStep8.png"}
            alt={"Access Token Step 8"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
          <h1 id={"install-app"} className={"text-3xl font-bold"}>
            Install App
          </h1>
          <h3 className={"text-sm"}>
            {"Navigate to API credentials and Install the app."}
          </h3>
          <img
            src={"/assets/images/Shopify/AccessTokenStep9.png"}
            alt={"Access Token Step 9"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
          <img
            src={"/assets/images/Shopify/AccessTokenStep10.png"}
            alt={"Access Token Step 10"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
          <h3 className={"text-sm"}>
            {"When prompted with the following window, click `install`."}
          </h3>
          <img
            src={"/assets/images/Shopify/AccessTokenStep11.png"}
            alt={"Access Token Step 11"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
          <h1 id={"generate-token"} className={"text-3xl font-bold"}>
            Generate Access Token
          </h1>
          <h3 className={"text-sm"}>
            {
              "Now that your app is installed, it's time to generate a unique access token."
            }
          </h3>
          <img
            src={"/assets/images/Shopify/AccessTokenStep12.png"}
            alt={"Access Token Step 12"}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl"
          />
          <h3 className={"text-sm"}>
            {
              "Click on `Reveal token once` and copy the token to your clipboard."
            }
          </h3>
          <p className={"text-red-500 italic text-xs text-balance font-bold"}>
            {
              "Make sure to copy the token once it's revealed, because you'll only be able to reveal it once, otherwise you'll have to repeat the entire process again"
            }
          </p>
          <h3 className={"text-sm"}>
            {`Once the token is copied, paste it into the designated text field provided at the bottom of this page. Click "Submit" to finalize the integration process.`}
          </h3>
          <div className="flex items-start justify-between gap-5">
            <div className={"flex flex-col gap-1"}>
              <Input
                type="text"
                placeholder="Paste the access token here"
                className="text-accent placeholder:text-accent/50 border-none bg-white drop-shadow-md"
                // onChange={(e) => setCode(e.target.value)}
              />
              <p
                className={"text-red-500 italic text-xs text-balance font-bold"}
              >
                {`Your access token is encrypted and stored securely. It is only used to access your Shopify store products and is never shared with any third party.`}
              </p>
            </div>
            <button
              className="w-auto h-10 rounded-xl bg-accent text-white px-2 flex items-center justify-center disabled:bg-gray-400"
              // onClick={handleShopifyCode}
              // disabled={!code}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className={"col-span-1 flex flex-col gap-5 ml-10 sticky right-0"}>
        <div className={"flex flex-col gap-5 p-1 mr-10"}>
          <h1 className={"text-sm font-bold text-black"}>On This Page</h1>
          <Link
            href={"/client/guide/stock-sheets/#custom-app-creation"}
            className={"text-black/50 hover:text-black text-sm font-semibold"}
          >
            Custom App Creation
          </Link>
          <Link
            href={"/client/guide/stock-sheets/#access-scope"}
            className={"text-black/50 hover:text-black text-sm font-semibold"}
          >
            Configure Access Scope
          </Link>
          <Link
            href={"/client/guide/stock-sheets/#install-app"}
            className={"text-black/50 hover:text-black text-sm font-semibold"}
          >
            Install App
          </Link>
          <Link
            href={"/client/guide/stock-sheets/#generate-token"}
            className={"text-black/50 hover:text-black text-sm font-semibold"}
          >
            Generate Access Token
          </Link>
        </div>
      </div>
    </div>
  );
}
