export default function TitleTables({title}:{title: string}){
    return(
        <>
            <div className="col-12 flex justify-content-center">
                <h2 style={{fontSize: '50px', color: '#9e6a90', fontStyle: 'italic', marginTop: '1px'}}>{title}</h2>
            </div>
        </>
    )
}