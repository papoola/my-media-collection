import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavButton from "@/components/NavButton";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { ConfirmationProvider } from "@/contexts/ConfirmationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Media Collection",
  description: "The ultimate media collection app for movie, series, and book enthusiasts.",
  keywords: ["movies", "series", "books", "media collection", "entertainment"],
  authors: [{ name: "Pouyan Savoli" }],
  publisher: "Pouyan Savoli",
  openGraph: {
    title: "My Media Collection",
    description: "The ultimate media collection app for movie, series, and book enthusiasts.",
    type: "website",
    locale: "en",
    siteName: "My Media Collection",
  },
  twitter: {
    title: "My Media Collection",
    description: "The ultimate media collection app for movie, series, and book enthusiasts.",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pb-32`}
      >
        <ThemeProvider>
          <ConfirmationProvider>

            <ThemeToggle />

            <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-gray-100 border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
              <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
                <NavButton label="Home" icon="fa-house" path="/" />
                <NavButton label="Movies" icon="fa-film" path="/movies" />
                <NavButton label="Series" icon="fa-tv" path="/series" />
                <NavButton label="Books" icon="fa-book-open" path="/books" />
              </div>
            </div>

            <ConfirmationDialog />
    
            {children}
          </ConfirmationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
