import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { CustomMiddleware } from "./chain";

const protectedPaths = ["/dashboard/shipments", "/"];

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // Create a response object to pass down the chain
    const response = NextResponse.next();
    const token = await getToken({ req: request });

    // @ts-ignore
    request.nextauth = request.nextauth || {};
    // @ts-ignore
    request.nextauth.token = token;

    const pathname = request.nextUrl.pathname;

    if (!token && protectedPaths.includes(pathname)) {
      const signInUrl = new URL("/api/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    return middleware(request, event, response);
  };
}
