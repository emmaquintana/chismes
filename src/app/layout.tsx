import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import cron from 'node-cron';
import prisma from "@/lib/db";
import TestingButton from "@/components/testing-button";
import { env } from "process";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chismes",
  description: "¿Sos una serpiente chismosa? ¡Entrá!",
};

// It deletes a register from password_reset that has 15 minutes or more.
cron.schedule('*/1 * * * *', async () => {
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

  try {
    const deletedRecords = await prisma.password_reset.deleteMany({
      where: {
        createdAt: {
          lte: fifteenMinutesAgo
        }
      }
    });

    if (deletedRecords.count > 0) {
      console.log(`Deleted ${deletedRecords.count} records from password_reset table in DB`);
    }
  } catch (error) {
    console.error('Error deleting records:', error);
  }
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-419">
      <head>
        <meta name="theme-color" content="hsl(278 71% 65%)"></meta>
      </head>
      <body className={cn("block h-fit overflow-y-auto", inter.className)}>
        <Header />
        <div className="mt-16 h-fit">
          {children}
        </div>
        <div className="flex gap-2 fixed left-2 bottom-2 items-center">
          {process.env.NODE_ENV !== 'production' &&
            <TestingButton />
          }
          {process.env.PREVIEW === 'true' &&
            <p className="text-2xl text-muted-foreground">Preview Version</p>
          }
        </div>
      </body>
    </html>
  );
}
