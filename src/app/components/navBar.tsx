import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import SelectInventory from './inventoryComponents/SelectInventory';

import './styleNavBar.css';

export default function NavBar() {
    const router = useRouter();
    const [visibleSelectInventory, setVisibleSelectInventory] = useState<boolean>(false);
    const [navBarVisible, setNavBarVisible] = useState(true);
    const [screenWidth, setScreenWidth] = useState<number>(0);

    useEffect(() => {
        // Detectar el ancho de la pantalla y actualizar el estado
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            if (window.innerWidth <= 767) {
                setNavBarVisible(false);
            } else {
                setNavBarVisible(true);
            }
        };
        handleResize(); // Llamarlo al principio para establecer el estado inicial
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const items = [
        {
            icon: 'pi pi-user',
            label: 'Usuarios',
            command: () => {
                router.push("/pages/main/user");
            }
        },
        {
            icon: 'pi pi-th-large',
            label: 'Inventarios',
            command: () => {
                router.push("/pages/main/inventory");
            }
        },
        {
            icon: 'pi pi-inbox',
            label: 'Productos',
            command: () => {
                setVisibleSelectInventory(true);
            }
        },
        {
            icon: 'pi pi-users',
            label: 'Proveedores',
            command: () => {
                router.push("/pages/main/inventory/supplier");
            }
        },
        {
            icon: 'pi pi-shopping-cart',
            label: 'Compras',
            command: () => {
                //Compas
            }
        },
        {
            icon: 'pi pi-dollar',
            label: 'Ventas',
            command: () => {
                //ventas
            }
        }
    ];


    const exit = () => {
        router.push("/pages/auth/login");
    };


    const toggleNavBarVisibility = () => {
        setNavBarVisible(prevVisible => !prevVisible);
    };



    return (
        <div>

            <div className={`navbar-container ${navBarVisible ? 'visible' : ''}`}>
                <div className="navbar-icons-container">

                    {screenWidth <= 767 && (
                        <Button
                            className='navbar-icon'
                           
                        />
                    )}

                    {items.map((item, index) => (
                        <Button key={index} icon={item.icon}
                            title={item.label}
                            className="navbar-icon"
                            onClick={item.command} />
                    ))}
                </div>
                <div className="navbar-power-off-container">
                    <Button
                        icon="pi pi-power-off"
                        className="navbar-icon2"
                        title='Cerrar sesión'
                        onClick={exit}
                    />
                </div>
                {visibleSelectInventory && <SelectInventory visible={visibleSelectInventory} setVisible={setVisibleSelectInventory} />}
            </div>

            {screenWidth <= 767 && (

                <Button
                    icon={`pi ${navBarVisible ? 'pi-chevron-left' : 'pi-chevron-right'}`}
                    className={`navbar-toggle-btn ${navBarVisible ? 'visible' : ''}`}
                    onClick={toggleNavBarVisibility}
                />
            )}


            {navBarVisible && <SelectInventory visible={visibleSelectInventory} setVisible={setVisibleSelectInventory} />}
        </div>
    );
}