'use client';

import "./theme.css";

import "primereact/resources/primereact.min.css";

import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className="p-0 m-0">
          {children}
      </body>
    </html>
  )
}
