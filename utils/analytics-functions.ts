import { AdminOrderType, OrderType, ShopifyOrderType } from "@/types/response";
import { ClientType } from "@/types/client";
import moment from "moment";

export function groupOrdersByPast12Months(data: OrderType[]): number[] {
  const currentMonth = new Date().getMonth();
  const months = new Array(12).fill(0);
  const monthYear = getPast12MonthsAndYear();
  data.forEach((order) => {
    const orderMonth: number = new Date(order.createdAt).getMonth();
    const orderYear: number = new Date(order.createdAt).getFullYear();
    const monthIndex = monthYear.findIndex(
      (month) => month.month === orderMonth && month.year === orderYear,
    );
    if (monthIndex !== -1) {
      months[monthIndex] += 1;
    }
  });
  return months.slice(currentMonth).concat(months.slice(0, currentMonth));
}

export function groupOrdersByStatusPast12Months(
  data: OrderType[],
  status: string,
): number[] {
  const currentMonth = new Date().getMonth();
  const months = new Array(12).fill(0);
  const monthYear = getPast12MonthsAndYear();
  data.forEach((order) => {
    const orderMonth: number = new Date(order.createdAt).getMonth();
    const orderYear: number = new Date(order.createdAt).getFullYear();
    const monthIndex = monthYear.findIndex(
      (month) => month.month === orderMonth && month.year === orderYear,
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
      (month) => month.month === orderMonth && month.year === orderYear,
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
  // const monthsLabel = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  // const months = new Array(12).fill(0);
  // const currentMonth = new Date().getMonth();
  // console.log("this month = ", currentMonth);
  // const past12Months = months.map((_, index) => {
  //   const month = currentMonth - index;
  //   return `${monthsLabel[Math.abs(month)]}`;
  // });
  // return past12Months.slice(1).concat(`${monthsLabel[currentMonth]}`);
  const months = [];
  for (let i = 0; i < 12; i++) {
    months.push(moment().subtract(i, "month").format("MMM"));
  }
  return months.reverse();
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

export function getNewMonthlyClients(clients: ClientType[]): ClientType[] {
  return clients.filter((client) => {
    return moment(client.createdAt).isSame(new Date(), "month");
  });
}

export function getNewYearlyClients(clients: ClientType[]): ClientType[] {
  return clients.filter((client) => {
    return moment(client.createdAt).isSame(new Date(), "year");
  });
}

export function getNewWeeklyClients(clients: ClientType[]): ClientType[] {
  return clients.filter((client) => {
    return moment(client.createdAt).isSame(new Date(), "week");
  });
}

export function groupNewClientsByMonth(clients: ClientType[]): number[] {
  const currentMonth = new Date().getMonth();
  const months = new Array(12).fill(0);
  const monthYear = getPast12MonthsAndYear();
  clients.forEach((client) => {
    const clientMonth: number = new Date(client.createdAt).getMonth();
    const clientYear: number = new Date(client.createdAt).getFullYear();
    const monthIndex = monthYear.findIndex(
      (month) => month.month === clientMonth && month.year === clientYear,
    );
    if (monthIndex !== -1) {
      months[monthIndex] += 1;
    }
  });
  return months.slice(currentMonth).concat(months.slice(0, currentMonth));
}

export function groupNewClientsByWeek(clients: ClientType[]): number[] {
  const days: number[] = Array(7).fill(0);
  clients.forEach((client) => {
    const clientDay = new Date(client.createdAt).getDay();
    days[clientDay] += 1;
  });
  return days;
}

export function groupNewClientsByYear(clients: ClientType[]): number[] {
  const years: number[] = Array(5).fill(0);
  clients.forEach((client) => {
    const clientYear = moment(client.createdAt).year();
    if (clientYear === moment().subtract(4, "year").year()) {
      years[0] += 1;
    } else if (clientYear === moment().subtract(3, "year").year()) {
      years[1] += 1;
    } else if (clientYear === moment().subtract(2, "year").year()) {
      years[2] += 1;
    } else if (clientYear === moment().subtract(1, "year").year()) {
      years[3] += 1;
    } else if (clientYear === moment().year()) {
      years[4] += 1;
    }
  });
  return years;
}

export function getTop5Clients(
  orders: (AdminOrderType | ShopifyOrderType)[],
  filter: "week" | "month" | "year",
): { client: string; order: number }[] {
  //   sum the number of orders belonging to each client
  let group: { [key: string]: number } = {};
  orders.forEach((order) => {
    if (
      (order.status === "delivered" || order.status === "collected") &&
      moment(order.createdAt).isSame(new Date(), filter)
    ) {
      if (Object.keys(group).includes(order.client.companyName)) {
        group[order.client.companyName] += 1;
      } else {
        group = { ...group, [order.client.companyName]: 1 };
      }
    }
  });
  let sortable: any[] = [];
  for (const groupKey in group) {
    sortable.push([groupKey, group[groupKey]]);
  }
  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
  let top5: { client: string; order: number }[] = [];
  for (let i = 0; i < 5; i++) {
    const item = sortable[i];
    top5.push({
      client: item[0],
      order: item[1],
    });
  }
  return top5;
}
