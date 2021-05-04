import { useEffect, useState } from "react";
import { fetchLaunches } from "./redux";
import {useDispatch, useSelector} from "react-redux"

function App() {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  
  const launchesState = useSelector((state)=>state.launches)

  useEffect(()=>{
    dispatch(fetchLaunches({queryBody:{},page:page }))
  }, [page])
  //This dependency will later to change to the params and queries provided
  //by the react-router and the UI will be used to change the URL not the
  //params of fetchLaunches. 
  //This approach will allow us to make the link to be shareable.
  
  const prevPage = ()=>{
    setPage((page)=>page>=1?page-1: page)
  }

  const nextPage = ()=>{
    setPage((page)=> page<=launchesState.totalPages? page+1: page)
  }

  return (
    <div className="App">
        <h1>Current Page {launchesState.currentPage}</h1>
        <p>Total pages {launchesState.totalPages}</p>
        {launchesState.hasPrevPage? <button onClick={prevPage}>Previous Page</button>: ""}
        {launchesState.hasNextPage? <button onClick={nextPage}>Next Page</button>: ""}

        <DisplayRecords launches={launchesState.launches} isLoading={launchesState.isLoading} hasError={launchesState.hasError}/>
    </div>
  );
}

const DisplayRecords = ({launches, isLoading, hasError})=>{
  const recordItems = launches.map((launch)=>{
    return (<li key={launch.id}>{launch.date_local}</li>)
  })

  return(
    <ul>
      {isLoading?<p>Loading...</p>:recordItems}
      {hasError? <p>Error fetching records</p>: ""}
    </ul>
  )
}

export default App;
