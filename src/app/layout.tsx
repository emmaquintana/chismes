import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import TestingButton from "@/components/testing-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chismes",
  description: "¿Sos una serpiente chismosa? ¡Entrá!",
  authors: [{ name: 'Quintana Emmanuel', url: 'https://www.linkedin.com/in/emmanuel-quintana/' }],
  category: 'Social Network',
  robots: { index: true, follow: true },
  keywords: ['Social network', 'Red social', 'Chismes', 'Red social chismes'],
  applicationName: 'Chismes',
  generator: 'Next.js',
  publisher: 'Vercel',
  icons: '/public/favicon.jpeg',
  openGraph: {
    title: 'Chismes',
    description: '¿Sos una serpiente chismosa? ¡Entrá!',
    images: {
      url: '/public/favicon.jpeg',
      height: 1024,
      width: 1024
    }    
  }  
};

// It deletes a register from password_reset that has 15 minutes or more.
//cron.schedule('*/1 * * * *', async () => {
//  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

//  try {
//    const deletedRecords = await prisma.password_reset.deleteMany({
//      where: {
//        createdAt: {
//          lte: fifteenMinutesAgo
//        }
//      }
//    });

//    if (deletedRecords.count > 0) {
//      console.log(`Deleted ${deletedRecords.count} records from password_reset table in DB`);
//    }
//  } catch (error) {
//    console.error('Error deleting records:', error);
//  }
//});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-419">
      <head>        
        <meta name="theme-color" content="hsl(278 71% 65%)"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=0.86, maximum-scale=4.0, minimum-scale=0.86"></meta>
      </head>
      <body className={cn("block h-fit overflow-y-auto", inter.className)}>
        <Header />
        <div className="mt-16 h-fit">
          {children}
        </div>
        <div className="flex gap-2 fixed left-4 bottom-4 items-center">
          {process.env.NODE_ENV !== 'production' &&
            <TestingButton />
          }
          {process.env.VERCEL_ENV !== 'production' &&
            <p className="text-3xl text-muted-foreground select-none">Alpha Version</p>
          }
        </div>
      </body>
    </html>
  );
}