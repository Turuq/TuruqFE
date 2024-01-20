import { cookies } from "next/headers";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const uploadForm = new FormData();
  const file = formData.get("file") as File;
  uploadForm.append("file", file);
  return await fetch(`${process.env.API_URL}product/add`, {
    method: "POST",
    headers: {
      Authorization: `${cookies().get("token")?.value}`,
    },
    body: uploadForm,
  });
}
