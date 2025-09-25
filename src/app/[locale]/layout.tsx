import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Inter, Mansalva } from "next/font/google";
import "../globals.css";
import ClientLayout from "./ClientLayout";
import { routing } from "@/i18n/routing";

export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ["latin"] });
const mansalva = Mansalva({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mansalva'
});

export const metadata = {
  title: "Arctica",
  description:
    "A modern web application for interacting with the Lens Protocol",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={mansalva.variable}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
