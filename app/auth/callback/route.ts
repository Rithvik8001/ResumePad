import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });

    try {
      // Exchange the code for a session
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        throw error;
      }

      // Redirect to dashboard after successful authentication
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch (error) {
      // If there's an error, redirect to sign-in with error
      console.error("Auth error:", error);
      return NextResponse.redirect(
        new URL("/sign-in?error=Authentication failed", request.url)
      );
    }
  }

  // If no code, redirect to sign-in page
  return NextResponse.redirect(new URL("/sign-in", request.url));
}
