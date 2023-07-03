'use client';

import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
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
      <body>
        <Toast ref={toast} />
        {children}
      </body>
    </html>
  )
}
