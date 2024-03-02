import { ClientInventoryType } from "@/types/response";

export function groupByItemDescription(items: ClientInventoryType[]) {
  return items.reduce(
    (acc, item) => {
      const existingCategory = acc.find(
        (i) => i.category === item.itemDescription,
      );
      if (existingCategory) {
        existingCategory.items.push(item);
      } else {
        acc.push({ category: item.itemDescription, items: [item] });
      }
      return acc;
    },
    [] as { category: string; items: ClientInventoryType[] }[],
  );
}
