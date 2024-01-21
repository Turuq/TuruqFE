import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (!cookies().get("token")) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    if (!cookies().get("client") && !cookies().get("admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/client", "/client/(.*)", "/admin", "/admin/(.*)"],
};
