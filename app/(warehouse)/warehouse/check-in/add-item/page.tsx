"use client";

import { getProductCodes } from "@/lib/actions";
import AddItemWarehouse from "@/app/(warehouse)/warehouse/check-in/add-item/AddItemWarehouse";
import { useEffect, useState } from "react";
import { CodesType } from "@/types/response";

export default function Page() {
  const [codes, setCodes] = useState<CodesType>();

  useEffect(() => {
    getProductCodes().then((data) => {
      setCodes(data);
    });
  }, []);

  return (
    <div className={"flex flex-col gap-5"}>
      <h1
        className={
          "text-2xl lg:text-4xl text-secondary_accent/50 uppercase font-bold"
        }
      >
        Add new item
      </h1>
      {codes && <AddItemWarehouse codes={codes} />}
      {/*<pre>*/}
      {/*  <code>{JSON.stringify(codes, null, 2)}</code>*/}
      {/*</pre>*/}
    </div>
  );
}
