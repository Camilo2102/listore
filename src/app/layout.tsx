'use client';

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";         

import 'primeflex/primeflex.css';

import { useEffect, useRef} from 'react';
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
      <body className={inter.className}>
        <Toast ref={toast} />
        {children}
      </body>
    </html>
  )
}
