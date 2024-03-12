import { Inter, Josefin_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { store } from "../redux/store";
import { Providers } from "./Provider";

const inter = Inter({ subsets: ["latin"] });


const poppins = Poppins({
  subsets:['latin'],
  weight:["400", "500", "600", "700"],
  variable:"--font-Poppins"
})

const josefin = Josefin_Sans({
  subsets:['latin'],
  weight:["400", "500", "600", "700"],
  variable:"--font-Josefin"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className={ `${poppins.variable} ${josefin.variable}`}>
            {children}
            <Toaster position="top-center" reverseOrder={false}/>
          </div>
        </Providers>
      </body>
    </html>
  );
}
