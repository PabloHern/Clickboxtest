import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ClickboxTest",
  description: "R3F + Stripe + Next + Sanity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen overflow-x-hidden"}>
        {children}
      </body>
    </html>
  );
}
