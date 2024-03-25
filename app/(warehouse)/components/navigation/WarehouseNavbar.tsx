import Image from "next/image";
import WarehouseDropDown from "@/app/(warehouse)/components/navigation/WarehouseDropdown";
import { WarehouseStaffType } from "@/types/response";

export default function WarehouseNavbar() {
  const warehouseOperator: WarehouseStaffType = {
    _id: "1",
    firstName: "Seif",
    lastName: "Ahmed",
    email: "seif.ahmed@turuq.co.eg",
    SSN: "123456789",
    accessLevel: "Operator",
  };
  return (
    <div className={"top-0 h-20 rounded-2xl flex items-center justify-between"}>
      <Image
        src={"/assets/images/babyblue.png"}
        alt={"Turuq.co"}
        width={80}
        height={80}
        aria-label={"Turuq.co"}
      />
      <div className="flex gap-2 items-center">
        {/*<Avatar className="size-10">*/}
        {/*  <AvatarFallback className={`bg-white text-black`}>WO</AvatarFallback>*/}
        {/*</Avatar>*/}

        {/*<div className="flex flex-col items-start gap-0">*/}
        <WarehouseDropDown warehouseStaff={warehouseOperator} />
        {/*<h1 className={`text-xs text-black capitalize`}>*/}
        {/*  {"Warehouse Operator"}*/}
        {/*</h1>*/}
        {/*<h3 className={`text-xs text-black font-bold uppercase`}>*/}
        {/*  {moment().hour() < 12*/}
        {/*    ? "Good Morning"*/}
        {/*    : moment().hour() < 18*/}
        {/*      ? "Good Afternoon"*/}
        {/*      : "Good Evening"}*/}
        {/*</h3>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
