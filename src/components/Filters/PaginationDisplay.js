import { Pagination } from "@material-ui/lab"
import {useEffect, useState} from "react"


function PaginationDisplay({currentPage, totalPages, isLoading, history, range,searchObj}) {

    const [page, setPage] = useState(1)

    //Checks if current page is greater than toatalPages available.
    // if yes redirects you to the last available page i.e. totalPages.
    useEffect(()=>{
        if(!isLoading){
        setPage(currentPage)

            if(currentPage>totalPages){
                history.push({
                    pathname: `/${totalPages}/${range}`,
                    search: searchObj.toString()
                })
            }
        }
    }, [isLoading])
    
    const handlePageClick = (e, page)=>{
        setPage(page)
        history.push({
            pathname: `/${page.toString()}/${range?range:""}`,
            search: searchObj.toString()
        })
    }

    return (
                <Pagination 
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    count={totalPages}
                    boundaryCount={1}
                    siblingCount={0}
                    onChange={handlePageClick}
                />
        
    )
}

export default PaginationDisplay
