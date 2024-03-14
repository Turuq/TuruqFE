import InformationCard from "@/app/(client)/components/cards/InformationCard";

export default async function Page() {
  return (
    <div className={""}>
      <div className={"grid grid-cols-3 gap-5"}>
        <div className={"col-span-3"}>
          <h1
            className={"text-4xl text-secondary_accent/50 uppercase font-bold"}
          >
            inventory
          </h1>
        </div>
        <div className={"col-span-3 lg:col-span-1"}>
          <InformationCard
            title={"In Stock"}
            value={0}
            className={"bg-white text-black"}
          />
        </div>
        <div className={"col-span-3 lg:col-span-1"}>
          <InformationCard
            title={"Out Of Stock"}
            value={0}
            className={"bg-white text-black"}
          />
        </div>
        <div className={"col-span-3 lg:col-span-1"}>
          <InformationCard
            title={"Low In Stock"}
            value={0}
            className={"bg-white text-black"}
          />
        </div>
        <div className={"col-span-3"}>
          <h1
            className={"text-4xl text-secondary_accent/50 uppercase font-bold"}
          >
            orders
          </h1>
        </div>
      </div>
    </div>
  );
}
