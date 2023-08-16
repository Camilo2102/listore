import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import SelectInventory from './inventoryComponents/SelectInventory';

import './styleNavBar.css';
import { AuthUtil } from '../utils/authUtil';
import { StorageService } from '../services/storageService';
import { useAuthContext } from '../context/authContext';
import { useNavigationContext } from '../context/navigationContext';

export default function NavBar() {
    const {goToRoute}= useNavigationContext();
    const [visibleSelectInventory, setVisibleSelectInventory] = useState<boolean>(false);
    const [navBarVisible, setNavBarVisible] = useState(true);
    const [screenWidth, setScreenWidth] = useState<number>(0);
    const {authorized, setAuthorized} = useAuthContext();

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
                goToRoute("/pages/main/user");
            }
        },
        {
            icon: 'pi pi-th-large',
            label: 'Inventarios',
            command: () => {
                goToRoute("/pages/main/inventory");
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
                goToRoute("/pages/main/inventory/supplier");
            }
        },
        {
            icon: 'pi pi-shopping-cart',
            label: 'Compras',
            command: () => {
                goToRoute("/pages/main/buy");
            }
        },
        {
            icon: 'pi pi-dollar',
            label: 'Ventas',
            command: () => {
                goToRoute("/pages/main/sale");
            }
        },
        {
            icon: 'pi pi-money-bill',
            label: 'Gastos',
            command: () => {
                goToRoute("/pages/main/spent");
            }
        }
    ];


    const exit = () => {
        setAuthorized(false);
    };


    const toggleNavBarVisibility = () => {
        setNavBarVisible(prevVisible => !prevVisible);
    };


    // navegacion
    const goBack = () => {
        window.history.back();
    };

    const goForward = () => {
        window.history.forward();
    };




    return (
        <div>

            <div className='navigation'>
                <Button className='back' icon='pi pi-arrow-left' onClick={goBack} />
                <Button className='forward' icon='pi pi-arrow-right' onClick={goForward} />
            </div>

            <div className={`navbar-container ${navBarVisible ? 'visible' : ''}`}>
                <div className="navbar-icons-container" onClick={() => screenWidth <= 767 && toggleNavBarVisibility()}>

                    

                    {items.map((item, index) => (
                        <Button key={index} icon={item.icon}
                            title={item.label}
                            className="navbar-icon"
                            onClick={item.command}
                            label={screenWidth <= 767 ? item.label : ''}
                        />

                    ))}
                </div>
                <div className="navbar-power-off-container">
                    <Button
                        icon="pi pi-power-off"
                        className="navbar-icon2"
                        title='Cerrar sesión'
                        label={screenWidth <= 767 ? 'Salir' : ''}
                        onClick={exit}
                    />
                </div>
                {visibleSelectInventory && <SelectInventory visible={visibleSelectInventory} setVisible={setVisibleSelectInventory} />}
            </div>



            {screenWidth <= 767 && (

                <Button
                    icon='pi pi-bars'
                    className={`navbar-toggle-btn ${navBarVisible ? 'visible' : ''}`}
                    onClick={toggleNavBarVisibility}
                />
            )}


            {navBarVisible && <SelectInventory visible={visibleSelectInventory} setVisible={setVisibleSelectInventory} />}
        </div>
    );
}