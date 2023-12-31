'use client';

import "./theme.css";

import "primereact/resources/primereact.min.css";

import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';
import { AuthProvider } from "./context/authContext";
import { LoadingProvider } from "./context/loadingContext";
import { useEffect } from "react";
import { NavigationProvider } from "./context/navigationContext";
import GlobalProviders from "./providers/globalProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className="p-0 m-0">
        <GlobalProviders>
          {children}
        </GlobalProviders>
      </body>
    </html>
  )
}
