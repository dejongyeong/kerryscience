import Image from 'next/image';
import Providers from './providers';

import './globals.css';

export const metadata = {
  title: 'Kerry Science Festival',
  description: 'Kerry Science Festival Ice Cream Robot Application',
  authors: [
    {
      name: 'De Jong Yeong',
      url: 'https://www.linkedin.com/in/de-jong-yeong/',
    },
  ],
  creator: 'De Jong Yeong',
  icons: { icon: '/favicon.ico' },
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ploughing EI',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="app">
        <Providers>
          <div className="flex flex-col items-center min-h-screen p-5">
            <div className="container max-w-xl">
              <div className="flex items-center justify-center mt-3 mb-5 gap-1">
                <div>
                  <Image
                    src="/ei-logo.png"
                    alt="Engineers Ireland Logo"
                    width={300}
                    height={256}
                    priority
                  />
                </div>
                <div>
                  <Image
                    src="/reedi-logo.svg"
                    alt="REEdI Logo"
                    width={300}
                    height={256}
                    priority
                  />
                </div>
              </div>
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
