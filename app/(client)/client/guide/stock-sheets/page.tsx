import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
        <p className={"text-black/50 text-sm capitalize"}>
          How to Integrate your Shopify Store Products with Turuq to generate
          Stock Sheets
        </p>
      </div>
    </div>
  );
}
