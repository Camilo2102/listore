"use client"
import { useRouter } from 'next/navigation';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';

export default function Home() {

  const router = useRouter();

  const items: MenuItem[] = [
    {
        label: 'login',
        icon: 'pi pi-fw pi-file',
        command: () => {router.push("/pages/login")}
    },
    {
        label: 'main',
        icon: 'pi pi-fw pi-pencil',
        command: () => {router.push("/pages/main")}
    },
    {
        label: 'playground',
        icon: 'pi pi-fw pi-user',
        command: () => {router.push("/pages/playground")}
    },
    {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
    },
    {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
    }
];

  return (
    <Menubar model={items} />
  )
}
