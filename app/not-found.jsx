import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function NotFound() {
  const requestHeaders = await headers();
  const acceptHeader = requestHeaders.get("accept") || "";

  if (acceptHeader.includes("text/html")) {
    redirect("/");
  }

  return null;
}
