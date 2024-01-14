"use server";

import { NewOrderParams } from "@/types/actions";
import { ClientType, FinanceStatisticsType } from "@/types/client";
import { GovernorateType } from "@/types/governorate";
import {
  LoginResponseType,
  NewOrderResponseType,
  ProductDetailsType,
  ProductType,
} from "@/types/response";
import { format } from "date-fns";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

/**
 * getToken(): is a function that checks if the token is stored in the browser's cookies,
 * if it exists the value of the token is returned,
 * otherwise we return null.
 * @returns Promise<string | null>
 */
export async function getTokenAction(): Promise<string | null> {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return token ? token.value : null;
}

/**
 * getGovernorateFees(): is a function that returns the fees for each governorate, if a valid token exists for the client requesting it.
 * @returns Promise<any[]>
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
 *  loginAction(): is a function that takes the email and password of the user and sends a request to the server to login,
 * @param email
 * @param password
 * @returns Promise<LoginResponseType>
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
      console.log("login failed");
      console.log(res);
      return { error: "Login Failed", type: null };
    } else {
      const data = await res.json();
      if (data.message) {
        return { error: data.message, type: null };
      }
      if (data.client) {
        cookies().set("token", data.token);
        cookies().set("client", JSON.stringify(data.client));
        return { error: null, type: "client" };
      } else if (data.admin) {
        cookies().set("token", data.token);
        cookies().set("admin", JSON.stringify(data.admin));
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
      cookies().set("token", data.token);
      cookies().set("client", JSON.stringify(data.client));
      return { error: null, type: "client" };
    } else if (data.admin) {
      cookies().set("token", data.token);
      cookies().set("admin", JSON.stringify(data.admin));
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
        })
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
        })
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

export async function uploadAdminInventoryExcelAction({
  file,
}: {
  file: FormData;
}): Promise<{ error: any; data: any }> {
  try {
    const res = await fetch(`${process.env.API_URL}product/add`, {
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
      }
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
      }
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
      }
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
      }
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
        })
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
      }
    );
    if (res.status !== 200) {
      return { error: "Failed to update order", message: null };
    }
    return { error: null, message: "Order updated successfully" };
  } catch (error: any) {
    return { error: error.message, message: null };
  }
}
