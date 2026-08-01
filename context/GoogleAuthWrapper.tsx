"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export default function GoogleAuthWrapper({ children }: { children: ReactNode }) {
  if (!CLIENT_ID) {
    // No client ID configured yet — render children without Google Sign-In.
    // The login/register pages check for this and hide the Google button.
    return <>{children}</>;
  }
  return <GoogleOAuthProvider clientId={CLIENT_ID}>{children}</GoogleOAuthProvider>;
}
