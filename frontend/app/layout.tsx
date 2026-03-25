import '@/app/ui/global.css';
import { Toaster } from "sonner";
// import { inter } from '@/app/ui/fonts';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from '@/app/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
          <Toaster richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}