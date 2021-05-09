import { Pagination } from "@material-ui/lab"
import {useEffect} from "react"


function PaginationDisplay({currentPage, totalPages, isLoading, history, range,searchObj}) {
     //Checks if current page is greater than toatalPages available.
    // if yes redirects you to the last available page i.e. totalPages.
    useEffect(()=>{
        if(!isLoading){
            if(currentPage>totalPages){
                history.push({
                    pathname: `/${totalPages}/${range}`,
                    search: searchObj.toString()
                })
            }
        }
    }, [isLoading])
    
    const handlePageClick = (e, page)=>{
        history.push({
            pathname: `/${page.toString()}/${range?range:""}`,
            search: searchObj.toString()
        })
    }

    return (
                <Pagination 
                    variant="outlined"
                    shape="rounded"
                    page={currentPage}
                    count={totalPages}
                    boundaryCount={1}
                    siblingCount={0}
                    onChange={handlePageClick}
                />
        
    )
}

export default PaginationDisplay
