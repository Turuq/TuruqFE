import { OrderType } from "@/types/response";

export function groupOrdersByPast12Months(data: OrderType[]): number[] {
  const currentMonth = new Date().getMonth();
  const months = new Array(12).fill(0);
  const monthYear = getPast12MonthsAndYear();
  data.forEach((order) => {
    const orderMonth: number = new Date(order.createdAt).getMonth();
    const orderYear: number = new Date(order.createdAt).getFullYear();
    const monthIndex = monthYear.findIndex(
      (month) => month.month === orderMonth && month.year === orderYear
    );
    if (monthIndex !== -1) {
      months[monthIndex] += 1;
    }
  });
  return months.slice(currentMonth).concat(months.slice(0, currentMonth));
}

export function groupOrdersByStatusPast12Months(
  data: OrderType[],
  status: string
): number[] {
  const currentMonth = new Date().getMonth();
  const months = new Array(12).fill(0);
  const monthYear = getPast12MonthsAndYear();
  data.forEach((order) => {
    const orderMonth: number = new Date(order.createdAt).getMonth();
    const orderYear: number = new Date(order.createdAt).getFullYear();
    const monthIndex = monthYear.findIndex(
      (month) => month.month === orderMonth && month.year === orderYear
    );
    if (monthIndex !== -1 && order.status === status) {
      months[monthIndex] += 1;
    }
  });
  return months.slice(currentMonth).concat(months.slice(0, currentMonth));
}

export function groupOrderFinancesPast12Month(data: OrderType[]): number[] {
  const currentMonth = new Date().getMonth();
  const months = new Array(12).fill(0);
  const monthYear = getPast12MonthsAndYear();
  data.forEach((order) => {
    const orderMonth: number = new Date(order.createdAt).getMonth();
    const orderYear: number = new Date(order.createdAt).getFullYear();
    const monthIndex = monthYear.findIndex(
      (month) => month.month === orderMonth && month.year === orderYear
    );
    if (
      monthIndex !== -1 &&
      (order.status === "delivered" || order.status === "collected")
    ) {
      let subtotal = 0;
      order.products.forEach((product) => {
        subtotal += product.quantity * product.price;
      });
      months[monthIndex] += subtotal;
    }
  });
  return months.slice(currentMonth).concat(months.slice(0, currentMonth));
}

function getPast12MonthsAndYear(): { month: number; year: number }[] {
  const months = new Array(12).fill(0);
  const currentMonth = new Date().getMonth();

  const past12Months = months.map((_, index) => {
    const month = currentMonth - index;
    const year = new Date().getFullYear() + Math.floor(month / 12);
    return { month: Math.abs(month), year };
  });
  return past12Months
    .slice(1)
    .concat({ month: currentMonth, year: new Date().getFullYear() });
}

export function getPast12Months(): string[] {
  const monthsLabel = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const months = new Array(12).fill(0);
  const currentMonth = new Date().getMonth();

  const past12Months = months.map((_, index) => {
    const month = currentMonth - index;
    return `${monthsLabel[Math.abs(month)]}`;
  });
  return past12Months.slice(1).concat(`${monthsLabel[currentMonth]}`);
}

export function revenuePerMonth(data: OrderType[]) {
  const month = new Array(12).fill(0);
  data.forEach((order) => {
    const m = new Date(order.createdAt).getMonth();
    if (order.status === "delivered" || order.status === "collected") {
      let subtotal = 0;
      order.products.forEach((product) => {
        subtotal += product.price * product.quantity;
      });
      month[m] += subtotal;
    }
  });
  console.log(month);
  let sum = 0;
  month.forEach((m) => {
    sum += m;
  });
  console.log(sum);
}
