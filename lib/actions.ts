"use server";

import {NewOrderParams} from "@/types/actions";
import {ClientType, FinanceStatisticsType} from "@/types/client";
import {GovernorateType} from "@/types/governorate";
import {
  CodesType,
  LoginResponseType,
  NewOrderResponseType,
  ProductDetailsType,
  ProductSummaryType,
} from "@/types/response";

import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";
import moment from "moment";

/**
 * getTokenAction(): is a function that returns the token of the client if it exists.
 * @returns Promise<string | null>
 * @example
 * const token = await getTokenAction();
 * if (token) {
 * // do something
 * }
 * else {
 * // do something else
 * }
 */
export async function getTokenAction(): Promise<string | null> {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return token ? token.value : null;
}

/**
 * getGovernorateFees(): is a function that returns the fees for each governorate, if a valid token exists for the client requesting it.
 * @returns Promise<GovernorateType[]>
 *     GovernorateType: {
 *     _id: string;
 *     name: string;
 *     fee: number;
 *     }[]
 * @example
 * const fees = await getGovernorateFeesAction();
 */
export async function getGovernorateFeesAction(): Promise<GovernorateType[]> {
  const token = await getTokenAction();
  if (token) {
    const res = await fetch(`${process.env.API_URL}admin/getFees`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const data = await res.json();
    return data.governorates;
  }
  return [];
}

/**
 *  loginAction(): is a function that takes in an email and password and logs in the user if the credentials are correct.
 * @param {object} email password
 * @returns Promise<LoginResponseType>
 *     LoginResponseType: {
 *     error: string | null;
 *     type: "client" | "admin" | null;
 *     }
 * @example
 * const { error, type } = await loginAction({ email, password });
 * if (error || type === null) {
 * // do something
 * }
 * if (type === "client") {
 *     // do something
 * }
 * if (type === "admin") {
 *     // do something
 * }
 */
export async function loginAction({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginResponseType> {
  try {
    // TODO: Send Email as lowercase -> needs to be handled in the DB first
    const body = { email, password };
    const res = await fetch(`${process.env.API_URL}auth/login`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status !== 200) {
      return { error: "Login Failed", type: null };
    } else {
      const data = await res.json();
      if (data.message) {
        return { error: data.message, type: null };
      }
      if (data.client) {
        cookies().set("token", data.token, {
          maxAge: 3600,
        });
        cookies().set("client", JSON.stringify(data.client), {
          maxAge: 3600,
        });
        return { error: null, type: "client" };
      } else if (data.admin) {
        cookies().set("token", data.token, {
          maxAge: process.env.NODE_ENV === "development" ? 24 * 60 * 60 : 3600,
        });
        cookies().set("admin", JSON.stringify(data.admin), {
          maxAge: process.env.NODE_ENV === "development" ? 24 * 60 * 60 : 3600,
        });
        return { error: null, type: "admin" };
      }
      return { error: "User Doesn't Exist", type: null };
    }
  } catch (error: any) {
    return { error: error.message, type: null };
  }
}

export async function registerAction({
  email,
  fullName,
  phone,
  businessName,
  businessLocation,
  password,
}: {
  email: string;
  fullName: string;
  phone: string;
  businessName: string;
  businessLocation: string;
  password: string;
}): Promise<{ error: string | null; type: "client" | "admin" | null }> {
  try {
    const body = {
      email,
      fullName,
      phone,
      businessName,
      businessLocation,
      password,
    };
    const res = await fetch(`${process.env.API_URL}client/register`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.message) {
      return { error: data.message, type: null };
    }
    if (data.client) {
      cookies().set("token", data.token, {
        maxAge: 3600,
      });
      cookies().set("client", JSON.stringify(data.client), {
        maxAge: 3600,
      });
      return { error: null, type: "client" };
    } else if (data.admin) {
      cookies().set("token", data.token, {
        maxAge: 3600,
      });
      cookies().set("admin", JSON.stringify(data.admin), {
        maxAge: 3600,
      });
      return { error: null, type: "admin" };
    } else {
      return { error: "User Doesn't Exist", type: null };
    }
  } catch (error: any) {
    console.log(error);
    return { error: error.message, type: null };
  }
}

export async function logoutAction({
  type,
}: {
  type: "client" | "admin";
}): Promise<void> {
  if (type === "client") {
    cookies().delete("client");
  } else if (type === "admin") {
    cookies().delete("admin");
  }
  cookies().delete("token");
  return;
}

export async function addNewOrderAction({
  customer,
  products,
  notes,
}: NewOrderParams): Promise<NewOrderResponseType> {
  const client = JSON.parse(cookies().get("client")?.value ?? "") as ClientType;
  const token = cookies().get("token")?.value;
  try {
    const body = { customer, products, notes, client: client._id };
    const res = await fetch(`${process.env.API_URL}order/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (data.message) {
      return { error: data.message, order: null };
    }

    revalidatePath("/client");

    return { error: null, order: data.order };
  } catch (error: any) {
    return { error: error.message, order: null };
  }
}

export async function uploadInventoryExcelAction({
  file,
}: {
  file: FormData;
}): Promise<{ error: any; data: any }> {
  try {
    const res = await fetch(`${process.env.API_URL}product/addClientSheet`, {
      method: "POST",
      body: file,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${cookies().get("token")?.value}`,
      },
    });
    const data = await res.json();
    return { error: null, data };
  } catch (error: any) {
    console.log(error);
    return { error: error.message, data: null };
  }
}

export async function submitContactFormAction({
  firstName,
  lastName,
  email,
  phone,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}): Promise<{ error: string | null; data: string | null }> {
  try {
    const res = await fetch(`${process.env.API_URL}auth/contactUs`, {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, phone, message }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return { error: null, data };
  } catch (error: any) {
    console.log(error);
    return { error: error.message, data: null };
  }
}

export async function passwordVerificationCodeAction({
  email,
}: {
  email: string;
}): Promise<{ error: string | null; message: string | null }> {
  try {
    const res = await fetch(`${process.env.API_URL}auth/forgotPassword`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      return { error: null, message: "Verification Code Sent" };
    } else {
      const data = await res.json();
      return { error: data.message, message: null };
    }
  } catch (error: any) {
    console.log(error);
    return { error: error.message, message: null };
  }
}

export async function verifyCodeAction({
  email,
  code,
}: {
  email: string;
  code: number;
}): Promise<{ error: string | null; message: string | null }> {
  try {
    const res = await fetch(`${process.env.API_URL}auth/verifyCode`, {
      method: "POST",
      body: JSON.stringify({ email, verificationCode: code }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      return { error: null, message: "Verification Code Sent" };
    } else {
      const data = await res.json();
      return { error: data.message, message: null };
    }
  } catch (error: any) {
    console.log(error);
    return { error: error.message, message: null };
  }
}

export async function resetPasswordAction({
  email,
  password,
  code,
}: {
  email: string;
  password: string;
  code: number;
}): Promise<{ error: string | null; message: string | null }> {
  try {
    const res = await fetch(`${process.env.API_URL}auth/resetPassword`, {
      method: "POST",
      body: JSON.stringify({ email, password, verificationCode: code }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      return { error: null, message: "Password Reset" };
    } else {
      const data = await res.json();
      return { error: data.message, message: null };
    }
  } catch (error: any) {
    console.log(error);
    return { error: error.message, message: null };
  }
}

export async function shopifyCodeAction({ code }: { code: string }) {
  try {
    await fetch(`${process.env.API_URL}client/update`, {
      method: "POST",
      body: JSON.stringify({ shopifyCode: code }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("token")?.value}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function addNewClientAction({
  name,
  email,
  phone,
  businessName,
  businessLocation,
  password,
  service,
}: {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessLocation: string;
  password: string;
  service: string;
}): Promise<{ error: string | null; message: string | null }> {
  try {
    const servicesOffered =
      service === "both" ? ["Storage", "Shipping"] : [service];
    const body = {
      name,
      email,
      phone,
      password,
      companyName: businessName,
      companyLocation: businessLocation,
      servicesOffered,
    };
    const res = await fetch(`${process.env.API_URL}client/add`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("token")?.value}`,
      },
    });

    if (res.status === 200) {
      revalidatePath("/admin");
      return { error: null, message: "Client Added Successfully" };
    } else {
      const data = await res.json();
      return { error: data.message, message: null };
    }
  } catch (error: any) {
    console.log(error.message);
    return { error: error.message, message: null };
  }
}

export async function editClientAction({
  name,
  email,
  phone,
  businessName,
  businessLocation,
  service,
}: {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessLocation: string;
  service: string;
}): Promise<{ error: string | null; message: string | null }> {
  try {
    const servicesOffered =
      service === "both" ? ["Storage", "Shipping"] : [service];
    const body = {
      name,
      email,
      phone,
      companyName: businessName,
      companyLocation: businessLocation,
      servicesOffered,
    };
    const res = await fetch(`${process.env.API_URL}client/update`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("token")?.value}`,
      },
    });

    if (res.status === 200) {
      revalidatePath("/admin");
      return { error: null, message: "Client Edited Successfully" };
    } else {
      const data = await res.json();
      return { error: data.message, message: null };
    }
  } catch (error: any) {
    console.log(error.message);
    return { error: error.message, message: null };
  }
}

export async function deleteClientAction({
  clientId,
}: {
  clientId: string;
}): Promise<{ error: string | null; message: string | null }> {
  try {
    const res = await fetch(`${process.env.API_URL}client/delete/${clientId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("token")?.value}`,
      },
    });

    if (res.status === 200) {
      revalidatePath("/admin/clients");
      return { error: null, message: "Client Deleted Successfully" };
    } else {
      const data = await res.json();
      return { error: data.message, message: null };
    }
  } catch (error: any) {
    console.log(error.message);
    return { error: error.message, message: null };
  }
}

export async function updateOrderStatusAction({
  orders,
  status,
  variant,
}: {
  orders: string[];
  status: string;
  variant: "orders" | "shopify" | "zammit";
}): Promise<{ error: number; success: number; message: string }> {
  try {
    const route =
      variant === "orders"
        ? "update"
        : variant === "shopify"
          ? "shopifyUpdate"
          : "zammitUpdate";
    let promises: any[] = [];
    orders.forEach((order) => {
      promises.push(
        fetch(`${process.env.API_URL}order/${route}/${order}`, {
          method: "PATCH",
          body: JSON.stringify({ status }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `${cookies().get("token")?.value}`,
          },
        }),
      );
    });
    const res = (await Promise.all(promises)) as Response[];
    let count = 0;
    let error = 0;
    res.forEach((response) => {
      if (response.status === 200) {
        count++;
      } else {
        error++;
      }
    });
    revalidatePath("/admin/orders");
    return { error, success: count, message: "" };
  } catch (error) {
    console.log(error);
    return {
      error: orders.length,
      success: 0,
      message: "Failed to update order status",
    };
  }
}

export async function assignCourierAction({
  orders,
  courier,
  variant,
}: {
  orders: string[];
  courier: string;
  variant: "orders" | "shopify" | "zammit";
}): Promise<{ error: number; success: number; message: string }> {
  try {
    const route =
      variant === "orders"
        ? "update"
        : variant === "shopify"
          ? "shopifyUpdate"
          : "zammitUpdate";
    let promises: any[] = [];
    orders.forEach((order) => {
      promises.push(
        fetch(`${process.env.API_URL}order/${route}/${order}`, {
          method: "PATCH",
          body: JSON.stringify({ courier }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `${cookies().get("token")?.value}`,
          },
        }),
      );
    });
    const res = (await Promise.all(promises)) as Response[];
    let count = 0;
    let error = 0;
    res.forEach((response) => {
      if (response.status === 200) {
        count++;
      } else {
        error++;
      }
    });
    revalidatePath("/admin/orders");
    return { error, success: count, message: "" };
  } catch (error) {
    console.log(error);
    return {
      error: orders.length,
      success: 0,
      message: "Failed to assign courier",
    };
  }
}

export async function getProductByIdAction({
  productId,
}: {
  productId: string;
}): Promise<{ error: string | null; data: ProductDetailsType | null }> {
  try {
    const res = await fetch(
      `${process.env.API_URL}product/getById/${productId}`,
      {
        method: "GET",
        headers: {
          Authorization: `${cookies().get("token")?.value}`,
        },
      },
    );
    if (res.status === 200) {
      const data = await res.json();
      return { error: null, data: data.product };
    } else {
      const data = await res.json();
      return { error: data.message, data: null };
    }
  } catch (error: any) {
    console.log(error);
    return { error: error.message, data: null };
  }
}

export async function returnProductAction({
  variant,
  orderId,
  productId,
  pathname,
}: {
  variant: "returned" | "shopifyReturned" | "zammitReturned";
  orderId: string;
  productId: string;
  pathname: string | undefined;
}): Promise<void> {
  try {
    const res = await fetch(
      `${process.env.API_URL}order/${variant}/${orderId}/${productId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `${cookies().get("token")?.value}`,
        },
      },
    );
    if (res.status === 200) {
      revalidatePath(pathname ?? "/admin/orders");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteOrderAction({
  orderId,
  variant,
  pathname,
}: {
  orderId: string;
  variant: "orders" | "shopify" | "zammit";
  pathname: string | undefined;
}) {
  try {
    const variantReq =
      variant === "orders"
        ? "delete"
        : variant === "shopify"
          ? "shopifyDelete"
          : "zammitDelete";
    const res = await fetch(
      `${process.env.API_URL}order/${variantReq}/${orderId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${cookies().get("token")?.value}`,
        },
      },
    );
    if (res.status === 200) {
      revalidatePath(pathname ?? "/admin/orders");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateClientFinancesAction({
  data,
  clientId,
}: {
  data: FinanceStatisticsType;
  clientId: string;
}): Promise<{ error: string | null; data: string | null }> {
  try {
    const res = await fetch(
      `${process.env.API_URL}admin/updateClientFinances/${clientId}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${cookies().get("token")?.value}`,
        },
      },
    );
    if (res.status === 200) {
      revalidatePath(`/admin/clients/${clientId}`);
      return { error: null, data: "Client Finances Updated" };
    }
    return { error: "Failed to update client finances", data: null };
  } catch (error: any) {
    console.log(error);
    return { error: error.message, data: null };
  }
}

export async function getAdminFinancesAction({
  clients,
}: {
  clients: Pick<ClientType, "_id">[];
}): Promise<FinanceStatisticsType> {
  let no = {
    collected: 0,
    storage: 0,
    prepaid: 0,
    packaging: 0,
    balance: 0,
    shipping: 0,
  };

  let adminFinance = {
    collected: 0,
    storage: 0,
    prepaid: 0,
    packaging: 0,
    balance: 0,
    shipping: 0,
  };

  let promises: any[] = [];
  clients.forEach(async (c) => {
    promises.push(
      fetch(`${process.env.API_URL}client/home/${c._id.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${cookies().get("token")?.value}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          adminFinance.collected += data.finance.collected;
          adminFinance.storage += data.finance.storage;
          adminFinance.prepaid += data.finance.prepaid;
          adminFinance.packaging += data.finance.packaging;
          adminFinance.balance += data.finance.balance;
        }),
    );
  });

  Promise.all(promises)
    .then(() => {
      return adminFinance;
    })
    .catch((error) => {
      console.log(error);
      return no;
    });

  return no;
}

export async function editOrderAction({
  body,
  variant,
  orderId,
}: {
  body: any;
  variant: "update" | "shopifyUpdate" | "zammitUpdate";
  orderId: string;
}): Promise<{ error: string | null; message: string | null }> {
  try {
    const res = await fetch(
      `${process.env.API_URL}order/${variant}/${orderId}`,
      {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${cookies().get("token")?.value}`,
        },
      },
    );
    if (res.status !== 200) {
      return { error: "Failed to update order", message: null };
    }
    return { error: null, message: "Order updated successfully" };
  } catch (error: any) {
    return { error: error.message, message: null };
  }
}

export async function deleteNotificationAction({
  notificationId,
  pathname,
}: {
  notificationId: string;
  pathname: string | undefined;
}) {
  try {
    const res = await fetch(
      `${process.env.API_URL}notification/delete/${notificationId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${cookies().get("token")?.value}`,
        },
      },
    );
    if (res.status === 200) {
      revalidatePath(pathname ?? "/client");
    }
  } catch (e) {
    console.log(e);
  }
}

export async function fetchAllClientsAction(): Promise<{
  error: string | null;
  clients: ClientType[] | null;
}> {
  try {
    const clientRes = await fetch(`${process.env.API_URL}client`, {
      method: "GET",
      next: { revalidate: 300 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("token")?.value}`,
      },
    });
    const clientData = (await clientRes.json()) as ClientType[];
    return { error: null, clients: clientData };
  } catch (e: any) {
    console.log(e);
    return { error: e.message, clients: null };
  }
}

export async function getClientInventoryAction(): Promise<{
  error: string | null;
  products: ProductSummaryType[] | null;
}> {
  try {
    const client: ClientType = JSON.parse(
      cookies().get("client")?.value ?? "",
    ) as ClientType;
    const res = await fetch(
      `${process.env.API_URL}product/clientProductsSummary/${client._id}`,
      {
        next: { revalidate: 300 },
        headers: {
          Authorization: `${cookies().get("token")?.value}`,
        },
      },
    );
    const data = (await res.json()) as { products: ProductSummaryType[] };
    return { error: null, products: data.products };
  } catch (e: any) {
    console.log(e.message);
    return { error: e.message, products: null };
  }
}

export async function filterAssignedOrdersAction({
  id,
  status,
  date,
  brand,
}: {
  id: string;
  status: "delivered/collected" | "outForDelivery" | "other" | null;
  date: Date | null;
  brand: string | null;
}) {
  try {
    let query = `?courierId=${id}`;
    let statusFilter = [];
    if (status) {
      switch (status) {
        case "delivered/collected":
          statusFilter = ["delivered", "collected"];
          break;
        case "outForDelivery":
          statusFilter = ["outForDelivery"];
          break;
        case "other":
          statusFilter = [
            "pending",
            "cancelled",
            "postponed",
            "returned",
            "outOfStock",
            "unreachable",
          ];
          break;
      }
      query += `&status=${statusFilter.join(",")}`;
    }
    if (date) {
      query += `&date=${moment(date).format("MM/DD/YYYY")}`;
    }
    if (brand) {
      query += `&brand=${brand}`;
    }
    const res = await fetch(
      `${process.env.API_URL}couriers/filterAssignedOrders${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `${cookies().get("token")?.value}`,
        },
      },
    );
    return await res.json();
  } catch (error: any) {
    console.log(error);
    return { error: error.message, data: null };
  }
}

export async function activateClientAction({
  clientId,
  pathname,
}: {
  clientId: string;
  pathname: string | undefined;
}) {
  try {
    const res = await fetch(
      `${process.env.API_URL}client/activate/${clientId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `${cookies().get("token")?.value}`,
        },
      },
    );
    const data = await res.json();
    if (data) {
      if (pathname) {
        revalidatePath(pathname);
      }
    }
    // else {
    //   throw new Error("Failed To Activate Client");
    // }
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
}

export async function getScannedProduct() {
  console.log("scanning barcode");
  try {
    const res = await fetch(`${process.env.API_URL}product/productByBarcode`, {
      method: "GET",
      next: { revalidate: 0 },
      headers: {
        Authorization: `${cookies().get("token")?.value}`,
      },
    });
    return await res.json();
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
}

export async function updateProductQuantityAction({
  UID,
  quantity,
}: {
  UID: string;
  quantity: number;
}) {
  try {
    const res = await fetch(`${process.env.API_URL}product/updateQuantity`, {
      method: "POST",
      body: JSON.stringify({ UID, quantity }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("token")?.value}`,
      },
    });
    return await res.json();
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
}

export async function getClientProductsAction({
  clientId,
}: {
  clientId: string;
}) {
  try {
    const res = await fetch(
      `${process.env.API_URL}productMapping/getClientProducts/${clientId}`,
      {
        method: "GET",
        headers: {
          Authorization: `${cookies().get("token")?.value}`,
        },
      },
    );
    return await res.json();
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
}

export async function getClientCredentials({ clientId }: { clientId: string }) {
  try {
    const res = await fetch(
      `${process.env.API_URL}productMapping/getClientCredentials/${clientId}`,
      {
        method: "GET",
        headers: {
          Authorization: `${cookies().get("token")?.value}`,
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
}

export async function getClientShopifyProducts({
  accessToken,
  storeName,
}: {
  accessToken: string;
  storeName: string;
}) {
  try {
    const res = await fetch(
      `https://${storeName}.myshopify.com/admin/api/2024-01/products.json?fields=id,title,variants&limit=250`,
      {
        method: "GET",
        headers: {
          "X-Shopify-Access-Token": accessToken,
        },
      },
    );
    const data = await res.json();
    if (data) return data;
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
}

export async function mapClientProducts({
  UID,
  shopifyID,
  assignedBy = "Karim Kamal",
  client,
}: {
  UID: string;
  shopifyID: string;
  assignedBy: string;
  client: string;
}) {
  try {
    const res = await fetch(`${process.env.API_URL}productMapping/mapProduct`, {
      method: "POST",
      headers: {
        Authorization: `${cookies().get("token")?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UID, shopifyID, assignedBy, client }),
    });
    const data = await res.json();
    if (data) return { message: "Products Mapped Successfully", status: 200 };
  } catch (e: any) {
    console.log(e);
    return { message: e.message, status: 400 };
  }
}

export async function getClientMappings({ clientId }: { clientId: string }) {
  try {
    const res = await fetch(
      `${process.env.API_URL}productMapping/getClientMappings/${clientId}`,
      {
        method: "GET",
        headers: {
          Authorization: `${cookies().get("token")?.value}`,
        },
      },
    );
    const data = res.json();
    if (data) return data;
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
}

export async function getProductCodes() {
  try {
    const res = await fetch(`${process.env.API_URL}product/getProductCodes`, {
      method: "GET",
      headers: {
        Authorization: `${cookies().get("token")?.value}`,
      },
    });
    const data = await res.json();
    if (data) return data as CodesType;
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
}

export async function checkProductExists({ UID }: { UID: string }) {
  try {
    const UID_Substring = UID.substring(0, 11);
    const res = await fetch(
      `${process.env.API_URL}product/checkProductExists`,
      {
        method: "POST",
        body: JSON.stringify({ UID: UID_Substring }),
        headers: {
          Authorization: `${cookies().get("token")?.value}`,
          "Content-Type": "application/json",
        },
      },
    );
    const data = await res.json();
    if (data) return data;
  } catch (e: any) {
    console.log(e);
    // throw new Error(e.message);
  }
}

export async function addNewCourierAction({
  firstName,
  lastName,
  phone,
  zone,
  salary,
  pathname,
}: {
  firstName: string;
  lastName: string;
  phone: string;
  zone: string;
  salary: string;
  pathname: string | undefined;
}) {
  try {
    const res = await fetch(`${process.env.API_URL}couriers/addNewCourier`, {
      method: "POST",
      headers: {
        Authorization: `${cookies().get("token")?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, phone, zone, salary }),
    });
    const data = (await res.json()) as { message?: string; error?: string };
    if (pathname) revalidatePath(pathname);
    if (data.message) return { data: data.message };
    if (data.error) return { error: data.error };
  } catch (e: any) {
    console.log(e);
    return { error: e.message };
  }
}

// export async function addNewProductAction({
//   UID,
//   itemDescription,
//   category,
//   size,
//   color,
//   quantity,
//     client
// });
