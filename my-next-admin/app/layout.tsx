import '@/app/ui/global.css';
import { Toaster } from "sonner";
// import { inter } from '@/app/ui/fonts';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}