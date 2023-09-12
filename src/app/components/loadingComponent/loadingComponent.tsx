import './loadingComponent.css';
import { useLoading } from '../../context/loadingContext';

export default function LoadingComponent() {
    const { isLoading, startLoading, stopLoading } = useLoading();

    return (
        <>
            {isLoading && <div className='loading-overlay' >
                <i className="pi pi-spin pi-spinner" style={{ fontSize: '2.5rem' }}></i>
            </div >}
        </>
    )
}