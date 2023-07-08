export default function Container ({title, children}: {title: string, children: React.ReactNode }) {
    return(
        <div className="md:p-6 lg:p-7 p-5 grid justify-content-center" style={{border: '1px solid', borderRadius: '30px', borderColor: 'rgba(0,0,0,0.5)'}}>
            <div className="col-12 text-center">
                <h2 className="text-5xl font-bold" style={{marginTop: '10px', marginBottom: '10px'}}>{title}</h2>
            </div>
            <div className="col-12">
                {children}
            </div>
        </div>
    )
}