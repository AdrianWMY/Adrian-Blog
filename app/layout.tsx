import type { Metadata } from 'next';
import { AR_One_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const arOneSans = AR_One_Sans({
  variable: '--font-ar-one-sans',
  subsets: ['latin'],
  weight: ['400', '700'], // or whatever weights you plan to use
});

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'AWMY Blog',
  description: 'A blog built with Next.js and Decap CMS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${arOneSans.className} flex flex-col min-h-screen`}>
        <main className="flex-grow overflow-x-hidden">
          <Header />
          <div className="container mx-auto my-auto p-2">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
