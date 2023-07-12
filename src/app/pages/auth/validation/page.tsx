import ValidationComponent from "@/app/components/authComponents/validationComponent";

export default function ValidationPassword(){


    const validationPart = () => {
        return (
            <div className="flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
                <div className='lg:col-6 md:col-6 col-12 p-8'>
                    <ValidationComponent ></ValidationComponent>
                </div>
                <div className="lg:col-6 md:col-6 hidden md:flex justify-content-center align-items-center">
                    <img src='/validatePassword.svg' alt='Login' width={'80%'} style={{ maxWidth: '750px' }}></img>
                </div>
            </div>
        )
    }

    return (

       validationPart()

    )
}