import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import SelectInventory from './inventoryComponents/selectInventory';

import './styleNavBar.css';

import { useAuthContext } from '../context/authContext';
import { useNavigationContext } from '../context/navigationContext';
import navBarItemMeta from '../interfaces/navBarItemMeta';
import StorageService from '../hooks/services/storageService';
import InformGeneratorPopUp from "@/app/components/informGeneratorComponents/informGeneratePopUp";

export default function NavBar() {
    const {getValue} = StorageService();
    const {goToRoute, version}= useNavigationContext();
    const [visibleSelectInventory, setVisibleSelectInventory] = useState<boolean>(false);
    const [navBarVisible, setNavBarVisible] = useState(true);
    const [screenWidth, setScreenWidth] = useState<number>(0);
    const {setAuthorized} = useAuthContext();
    const role = getValue("role");


    const handleResize = () => {
        setScreenWidth(window.innerWidth);
        if (window.innerWidth <= 767) {
            setNavBarVisible(false);
        } else {
            setNavBarVisible(true);
        }
    };

    useEffect(() => {
        // Detectar el ancho de la pantalla y actualizar el estado
        
        handleResize(); // Llamarlo al principio para establecer el estado inicial
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const items: navBarItemMeta[] = [
        {
            icon: 'pi pi-user',
            label: 'Usuarios',
            roles: ['C','M'], // Roles autorizados para ver este elemento
            command: () => {
                goToRoute("/pages/main/user");
            }
           
        },
        {
            icon: 'pi pi-th-large',
            label: 'Inventarios',
            roles: ['C','M',],
            command: () => {
                goToRoute("/pages/main/inventory");
            }
            
        },
        {
            icon: 'pi pi-inbox',
            label: 'Productos',
            roles: ['C','M'] ,
            command: () => {
                setVisibleSelectInventory(true);
            },
            
        },
        {
            icon: 'pi pi-users',
            label: 'Proveedores',
            roles: ['C','M'],
            command: () => {
                goToRoute("/pages/main/inventory/supplier");
            },
           
        },
        {
            icon: 'pi pi-shopping-cart',
            label: 'Compras',
            roles: ['C','M','D'],
            command: () => {
                goToRoute("/pages/main/buy");
            }
        },
        {
            icon: 'pi pi-dollar',
            label: 'Ventas',
            roles: ['C','M','D','P','G'],
            command: () => {
                goToRoute("/pages/main/sale");
            }
        },
        {
            icon: 'pi pi-money-bill',
            label: 'Gastos',
            roles: ['C','M','D','P'],
            command: () => {
                goToRoute("/pages/main/spent");
            }
        }
    ];

    const filteredItems = items.filter(item => role !== null && item.roles.includes(role));



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

            {version !== "" && <div className='navigation'>
                <Button className='back' icon='pi pi-arrow-left' onClick={goBack} />
                <Button className='forward' icon='pi pi-arrow-right' onClick={goForward} />
            </div>}

            <div className={`navbar-container ${navBarVisible ? 'visible' : ''}`}>
                <div className="navbar-icons-container" onClick={() => screenWidth <= 767 && toggleNavBarVisibility()}>
                    <div className="flex justify-content-center align-items-center">
                        <img src="/listoreIcon.png" alt="ListoreLogo" style={{maxWidth: "40%", padding: "0.75rem 0"}}/>
                    </div>
                    {filteredItems.map((item, index) => (
                        <Button key={index} icon={item.icon}
                            title={item.label}
                            className="navbar-icon"
                            onClick={item.command}
                            label={screenWidth <= 767 ? item.label : ''}
                        />

                    ))}
                </div>
                <div className="navbar-power-off-container">
                    <InformGeneratorPopUp screenWidth={screenWidth} />

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