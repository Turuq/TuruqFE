"use client";

import { ClientType } from "@/types/client";
import ComboBox from "../../components/input/combobox";
import { useEffect, useState } from "react";
import {
  getClientCredentials,
  getClientMappings,
  getClientProductsAction,
  getClientShopifyProducts,
  mapClientProducts,
} from "@/lib/actions";
import {
  ClientInventoryType,
  MappedProductType,
  PopulatedMappedProductType,
  ShopifyInventoryType,
} from "@/types/response";
import { Checkbox } from "@/components/ui/checkbox";
import { groupByItemDescription } from "@/utils/functions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PencilIcon, TrashIcon } from "lucide-react";

export default function MappingSection({ clients }: { clients: ClientType[] }) {
  const { toast } = useToast();
  const [value, setValue] = useState("");
  const [inventory, setInventory] = useState<ClientInventoryType[]>();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedShopifyProduct, setSelectedShopifyProduct] = useState("");
  const [groupedProducts, setGroupedProducts] =
    useState<{ category: string; items: ClientInventoryType[] }[]>();
  const [shopifyProducts, setShopifyProducts] =
    useState<ShopifyInventoryType[]>();
  const [mappedProducts, setMappedProducts] = useState<
    PopulatedMappedProductType[]
  >([]);

  useEffect(() => {
    if (value.length !== 0) {
      const clientId = clients.find(
        (c) => c.companyName.toLowerCase() === value.toLowerCase(),
      )?._id;
      getClientProductsAction({ clientId: clientId ? clientId : "" })
        .then((data) => {
          setInventory(data);
          const grouped = groupByItemDescription(data);
          setGroupedProducts(grouped);
        })
        .catch((e) => console.log(e));

      getClientCredentials({ clientId: clientId ? clientId : "" })
        .then((data) => {
          const { accessToken, storeName } = data;
          getClientShopifyProducts({ accessToken, storeName })
            .then((data) => {
              setShopifyProducts(data.products);
            })
            .catch((e) => console.log(e));
        })
        .catch((err) => console.log(err));
    }
  }, [value]);

  async function handleProductMapping() {
    const data = await mapClientProducts({
      UID: selectedProduct,
      shopifyID: selectedShopifyProduct,
      assignedBy: "Karim Kamal",
      client:
        clients.find((c) => c.companyName.toLowerCase() === value.toLowerCase())
          ?._id ?? "",
    });
    if (data?.status === 200) {
      const newValues = await getClientMappings({
        clientId:
          clients.find(
            (c) => c.companyName.toLowerCase() === value.toLowerCase(),
          )?._id ?? "",
      });
      const newInventory = inventory?.filter(
        (i) => !newValues.find((v: MappedProductType) => v.UID === i.UID),
      );
      const newGroupedInventory = groupByItemDescription(newInventory ?? []);

      let newShopifyInventory = shopifyProducts?.map((p) => {
        return {
          ...p,
          variants: p.variants.filter(
            (v) =>
              !newValues.find(
                (m: MappedProductType) => m.shopifyID === v.id.toString(),
              ),
          ),
        };
      });
      setGroupedProducts(newGroupedInventory);
      setShopifyProducts(newShopifyInventory);
      setMappedProducts(newValues);
      setSelectedProduct("");
      setSelectedShopifyProduct("");
      toast({
        title: "Product Mapping",
        description: data.message,
      });
    }
  }

  useEffect(() => {
    if (value) {
      getClientMappings({
        clientId:
          clients.find(
            (c) => c.companyName.toLowerCase() === value.toLowerCase(),
          )?._id ?? "",
      })
        .then((mappings) => {
          if (mappings) {
            setMappedProducts(mappings);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [value]);

  useEffect(() => {
    setSelectedShopifyProduct("");
    setSelectedProduct("");
  }, [value]);

  // useEffect(() => {
  //   if (mappedProducts && shopifyProducts && inventory) {
  //     let filteredProducts: ClientInventoryType[] = [];
  //     let filteredShopifyProducts: ShopifyInventoryType[] = [];
  //     inventory?.forEach((item) => {
  //       const found = mappedProducts?.find(
  //         (mapping) => mapping.UID === item.UID,
  //       );
  //       if (!found) filteredProducts.push(item);
  //     });
  //     shopifyProducts?.forEach((item) => {
  //       let filteredVariants: VariantType[];
  //       item.variants.forEach((v) => {
  //         const found = mappedProducts?.find(
  //           (mapping) => mapping.shopifyID === v.id.toString(),
  //         );
  //         if (!found) filteredVariants.push(v);
  //       });
  //       filteredShopifyProducts.push(item);
  //     });
  //     setShopifyProducts(filteredShopifyProducts);
  //     setGroupedProducts(groupByItemDescription(filteredProducts));
  //   }
  // }, [mappedProducts]);

  return (
    <div className={"bg-white p-5 flex flex-col rounded-2xl gap-5"}>
      <div className={"flex items-center justify-between gap-5"}>
        <ComboBox data={clients} value={value} setValue={setValue} />
        <Button
          className={
            "bg-secondary_accent rounded-xl hover:bg-secondary_accent/50"
          }
          disabled={!selectedProduct || !selectedShopifyProduct}
          onClick={handleProductMapping}
        >
          Map Product
        </Button>
      </div>
      <h1 className={"uppercase text-secondary_accent/50 font-bold text-lg"}>
        product mapping
      </h1>
      <div className={"grid grid-cols-2 gap-5"}>
        {groupedProducts && mappedProducts && (
          <div className={"flex flex-col gap-5"}>
            <p className={"italic text-xs text-black/50 font-light"}>
              showing {inventory?.length} products
            </p>
            {groupedProducts?.map((group) => (
              <Accordion
                type="single"
                collapsible={
                  !group.items.find((p) => p.UID.toString() === selectedProduct)
                }
                key={group.category}
              >
                <AccordionItem value={group.category}>
                  <AccordionTrigger
                    className={"bg-gray-50 rounded-2xl p-5 mb-5"}
                  >
                    <div className={"flex items-center justify-between gap-5"}>
                      <p className={"italic text-sm text-black/80 font-light"}>
                        {group.category}
                      </p>
                      <p
                        className={"text-xs font-bold italic text-black/50"}
                      ></p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div
                      className={
                        "has-[div]:flex hidden flex-col gap-5 bg-white/0 rounded-2xl"
                      }
                    >
                      {group.items.map((product) => (
                        <>
                          {!mappedProducts.find(
                            (p) => p.UID.UID === product.UID,
                          ) && (
                            <div
                              className={`flex gap-5 rounded-lg items-center p-2 ${selectedProduct.length > 0 && selectedProduct !== product.UID ? "bg-gray-100" : "bg-white"}`}
                              key={product.UID}
                            >
                              <Checkbox
                                disabled={
                                  selectedProduct.length > 0 &&
                                  selectedProduct !== product.UID
                                }
                                checked={selectedProduct === product.UID}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedProduct(product.UID);
                                  } else {
                                    setSelectedProduct("");
                                  }
                                }}
                              />
                              <div className={"flex flex-col gap-1 w-[50%]"}>
                                <p
                                  className={"font-light text-xs text-black/80"}
                                >
                                  Product Name
                                </p>
                                <h3
                                  className={
                                    "font-bold text-xs text-black text-balance"
                                  }
                                >
                                  {product.itemDescription}
                                </h3>
                              </div>
                              <div className={"flex flex-col gap-1 w-[25%]"}>
                                <p
                                  className={"font-light text-xs text-black/80"}
                                >
                                  Color
                                </p>
                                <h3
                                  className={
                                    "font-bold text-xs text-black text-balance"
                                  }
                                >
                                  {product.color}
                                </h3>
                              </div>
                              <div className={"flex flex-col gap-1 w-[25%]"}>
                                <p
                                  className={"font-light text-xs text-black/80"}
                                >
                                  Size
                                </p>
                                <h3
                                  className={
                                    "font-bold text-xs text-black text-balance"
                                  }
                                >
                                  {product.size}
                                </h3>
                              </div>
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        )}
        {shopifyProducts && mappedProducts && (
          <div className={"flex flex-col gap-5"}>
            <p className={"italic text-xs text-black/50 font-light"}>
              showing {shopifyProducts?.length} shopify products
            </p>
            {shopifyProducts?.map((group) => (
              <>
                {group.variants.length > 0 && (
                  <Accordion
                    type="single"
                    collapsible={
                      !group.variants.find(
                        (p) => p.id.toString() === selectedShopifyProduct,
                      )
                    }
                    key={group.title}
                  >
                    <AccordionItem value={group.title}>
                      <AccordionTrigger
                        className={"bg-gray-50 rounded-2xl p-5 mb-5"}
                      >
                        <div
                          className={"flex items-center justify-between gap-5"}
                        >
                          <p
                            className={
                              "italic text-sm text-black/80 font-light"
                            }
                          >
                            {group.title}
                          </p>
                          <p
                            className={"text-xs font-bold italic text-black/50"}
                          ></p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div
                          className={
                            "flex flex-col gap-5 bg-white/0 rounded-2xl"
                          }
                        >
                          {group.variants.map((product) => (
                            <>
                              {!mappedProducts.find(
                                (p) => p.shopifyID === product.id.toString(),
                              ) && (
                                <div
                                  className={`flex justify-between gap-5 rounded-lg items-center p-2 ${selectedShopifyProduct.length > 0 && selectedShopifyProduct !== product.id.toString() ? "bg-gray-100" : "bg-white"}`}
                                  key={product.id}
                                >
                                  <Checkbox
                                    disabled={
                                      selectedShopifyProduct.length > 0 &&
                                      selectedShopifyProduct !==
                                        product.id.toString()
                                    }
                                    checked={
                                      selectedShopifyProduct ===
                                      product.id.toString()
                                    }
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setSelectedShopifyProduct(
                                          product.id.toString(),
                                        );
                                      } else {
                                        setSelectedShopifyProduct("");
                                      }
                                    }}
                                  />
                                  <div
                                    className={"flex flex-col gap-1 w-[50%]"}
                                  >
                                    <p
                                      className={
                                        "font-light text-xs text-black/80"
                                      }
                                    >
                                      Product Name
                                    </p>
                                    <h3
                                      className={
                                        "font-bold text-xs text-black text-balance"
                                      }
                                    >
                                      {product.title}
                                    </h3>
                                  </div>
                                  <div
                                    className={"flex flex-col gap-1 w-[25%]"}
                                  >
                                    <p
                                      className={
                                        "font-light text-xs text-black/80"
                                      }
                                    >
                                      Option 1
                                    </p>
                                    <h3
                                      className={
                                        "font-bold text-xs text-black text-balance"
                                      }
                                    >
                                      {product.option1}
                                    </h3>
                                  </div>
                                  <div
                                    className={"flex flex-col gap-1 w-[25%]"}
                                  >
                                    <p
                                      className={
                                        "font-light text-xs text-black/80"
                                      }
                                    >
                                      Option 2
                                    </p>
                                    <h3
                                      className={
                                        "font-bold text-xs text-black text-balance"
                                      }
                                    >
                                      {product.option2}
                                    </h3>
                                  </div>
                                </div>
                              )}
                            </>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </>
            ))}
          </div>
        )}
      </div>
      <div className={"dark-glass rounded-xl p-5 flex flex-col gap-5"}>
        <h1 className={"uppercase text-secondary_accent/50 font-bold text-lg"}>
          mapped products
        </h1>
        {mappedProducts.map((product) => (
          <div
            key={product.UID.UID}
            className={`flex justify-between gap-5 rounded-lg items-center p-2 bg-white`}
          >
            <div className={"flex flex-col gap-1 w-[50%]"}>
              <p className={"font-light text-xs text-black/80"}>Product Name</p>
              <h3 className={"font-bold text-xs text-black text-balance"}>
                {product.UID.itemDescription}
              </h3>
            </div>
            <div className={"flex flex-col gap-1 w-[25%]"}>
              <p className={"font-light text-xs text-black/80"}>Color</p>
              <h3 className={"font-bold text-xs text-black text-balance"}>
                {product.UID.color}
              </h3>
            </div>
            <div className={"flex flex-col gap-1 w-[25%]"}>
              <p className={"font-light text-xs text-black/80"}>Size</p>
              <h3 className={"font-bold text-xs text-black text-balance"}>
                {product.UID.size}
              </h3>
            </div>
            <div className={"flex items-center justify-center gap-5"}>
              <Button size={"icon"} variant={"ghost"}>
                <TrashIcon className={"size-4 text-red-500"} />
              </Button>
              <Button size={"icon"} variant={"ghost"}>
                <PencilIcon className={"size-4 text-secondary_accent"} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
