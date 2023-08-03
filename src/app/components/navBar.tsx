import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { useRouter } from 'next/navigation';
import SelectInventory from './inventoryComponents/SelectInventory';


export default function NavBar() {
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);
    const [visibleSelectInventory, setVisibleSelectInventory] = useState<boolean>(false);
   
    const items = [
        {
            label: 'Usuarios',
            icon: 'pi pi-user',
            command: () => {
                router.push("/pages/main/user")
            }
        },
        {
            label: 'Inventarios',
            icon: 'pi pi-th-large',
            command: () => {
               router.push("/pages/main/inventory")
            }
        },
        {
            label: 'Productos',
            icon: 'pi pi-inbox',
            command: () => {
                 setVisibleSelectInventory(true);
               
            }
        },
        {
            label: 'Proveedores',
            icon: 'pi pi-users',
            command: () => {
                router.push("/pages/main/inventory/supplier")
            }
            
        },
        {
            separator: true
        },
        {
            label: 'Salir',
            icon: 'pi pi-power-off',
            command: () => {
                router.push("/pages/auth/login")
            }
        }
    ];


    
    

   

    return (
        <div className="card">
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <h2>Menu </h2>
                
                <Menu model={items} style={{ width: '100%' }} />
            </Sidebar>
            <div className="flex justify-content-start pt-3 pl-3">
                <Button icon="pi pi-th-large" onClick={() => setVisible(true)} />
            </div>

            {visibleSelectInventory && <SelectInventory visible={visibleSelectInventory} setVisible={setVisibleSelectInventory} />}
        </div>
    );
}
