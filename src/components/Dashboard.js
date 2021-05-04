import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { useParams, useLocation, useHistory } from 'react-router';
import { fetchLaunches } from "../redux";
import {checkUrlValidity, getQueryFromUrl} from "./helpers"

//We will be using the URL to infer what the query for the fetchLaunches action should be.
//The url pattern is /:page/:range?filterName=filterValue
//NOTE: the code is made such that pattern can reasonably tolerate null values.

function Dashboard() {
  const dispatch = useDispatch()
  //Currently we are loading the entire state. 
  const launchesState = useSelector((state)=>state.launches)


  const {page, range} = useParams()
  const location = useLocation()
  const searchObj = new URLSearchParams(location.search)
  const history = new useHistory()

  //This effect is responsible for checking the validity of the URL pattern supplied.
  // If the pattern is valid then the fetchLaunches action is dispatched with its query.
  // Otherwise the page is redirected to a base_url
  useEffect(()=>{
    const {isValid, newUrl }= checkUrlValidity(page, range)

    if(!isValid){
        history.push({
            pathname: newUrl,
            search : searchObj.toString()
        })
    }else{
        dispatch(fetchLaunches({queryBody:getQueryFromUrl(range, searchObj),page:page?page:1 }))
    }
  }, [page, range])
  // Since the effect is dependent on URL Params page and range, after the redirect the 
  // fetchLaunches action is deployed as well. 


  //Checks if current page is greater than toatalPages available.
  // if yes redirects you to the last available page i.e. totalPages.
  useEffect(()=>{
    if(!launchesState.isLoading){
        if(launchesState.currentPage>launchesState.totalPages){
            history.push({
                pathname: `/${launchesState.totalPages}/${range}`,
                search: searchObj.toString()
            })
        }
    }
  }, [launchesState.isLoading])
  

  return (
    //Displaying the data that is fetched after infering the query from the URL.
    //Next step would be to add functionality for the UI to change the URL.
    <div className="App">
        <h1>Current Page {launchesState.currentPage}</h1>
        <p>Total pages {launchesState.totalPages}</p>

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

export default Dashboard
