
function Pagination({currentPage, totalPages, handlePageClick, isLoading, hasError}) {
    //Simple pagination buttons that push :page value to URL
    const totalPageBar = Array.from({length:totalPages},(_,i)=>i+1).map((page)=>{
        return (<button className={currentPage===page? "currentPageBtn":"pageBtn"} key={page} onClick={()=>{handlePageClick(page)}}>{page}</button>)
    })


    return (
            <div className="pagination">
                {!isLoading? totalPageBar:""}
            </div>
        
    )
}

export default Pagination
