'use client';

import "./theme.css";

import "primereact/resources/primereact.min.css";

import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';

import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ToastService } from './services/toastService';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const toast = useRef<Toast>(null);

  useEffect(() => {
    ToastService.initializeToast(toast);
  }, [])


  return (
    <html lang="en">
      <body className="p-0 m-0">
        <Toast ref={toast} />
        {children}
      </body>
    </html>
  )
}
