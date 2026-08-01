import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import GoogleAuthWrapper from "@/context/GoogleAuthWrapper";
import { Toaster } from "react-hot-toast";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "AV Academy — Learn Video Editing",
  description: "Hands-on video editing courses: cutting, color grading, motion graphics and sound design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-void font-body text-chalk antialiased">
        <GoogleAuthWrapper>
          <AuthProvider>{children}</AuthProvider>
        </GoogleAuthWrapper>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#13161B",
              color: "#F4F5F7",
              border: "1px solid #262B33",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
