// src/app/fonts.ts
import { AR_One_Sans } from 'next/font/google';

export const arOneSans = AR_One_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ar-one-sans',
  adjustFontFallback: true, // Helps with CLS
  axes: ['ARRR'], // Enable the custom axis
});