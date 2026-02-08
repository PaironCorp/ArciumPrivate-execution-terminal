import "./globals.css"; 
import AppWalletProvider from "./AppWalletProvider";

export const metadata = {
  title: "Arcium Private Perps",
  description: "Confidential trading powered by Arcium",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppWalletProvider>
          {children}
        </AppWalletProvider>
      </body>
    </html>
  );
}