import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <AppRouterCacheProvider>
            {children}
        </AppRouterCacheProvider>
    </html>
  );
}
