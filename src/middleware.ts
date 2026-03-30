import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import getOrCreateDB from "./models/server/dbSetup";
import getOrCreateStorage from "./models/server/storageSetup";

let isInitialized = false;

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (!isInitialized) {
    isInitialized = true;
    try {
      await Promise.all([getOrCreateDB(), getOrCreateStorage()]);
    } catch (error) {
      // Optionally log severe setup errors here, but avoid spamming the console
    }
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  /* match all request paths except for the the ones that starts with:
  - api
  - _next/static
  - _next/image
  - favicon.com

  */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
