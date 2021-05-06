import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { useParams, useLocation, useHistory } from 'react-router';
import { fetchLaunches } from "../redux";
import {checkUrlValidity, getQueryFromUrl, filterNames} from "./helpers"

import Filters from "./Filters"
import DisplayRecords from "./DisplayRecords"
import DatePickerDisplay from "./DatePickerDisplay"
import Pagination from './Pagination';

import { Container } from '@material-ui/core';
import Header from './Header';



//We will be using the URL to infer what the query for the fetchLaunches action should be.
//The url pattern is /:page/:range?filterName=filterValue
//NOTE: the code is made such that pattern can reasonably tolerate null values.

function Dashboard() {
  const dispatch = useDispatch()
  //Currently we are loading the entire state. 
  const launchesState = useSelector((state)=>state.launches)
  const {page, range} = useParams()
  
  const [filterSelected, setFilterSelected ]= useState("")
  const [rangePicker, setRangePicker] = useState({
    startDate: range? new Date(range.split("_")[0]): new Date(), 
    endDate:range?new Date(range.split("_")[1]) : new Date(),
    key:'selection'
                                            
  })

  const location = useLocation()
  const searchObj = new URLSearchParams(location.search)
  const history = useHistory()

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
        const queryBody = getQueryFromUrl(range, searchObj)
        dispatch(fetchLaunches({queryBody,page:page?page:1 }))
    }
    filterNames.forEach((filterName)=>{
        if(searchObj.has(filterName)){
            console.log("Filtering")
            setFilterSelected(`${filterName}_${searchObj.get(filterName)}`)
        }
    })
  }, [page, range, location.search])
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
  


  //Changing URL depending on the dropdown selected.
  //We will only allow one filter to be applied
  const handleSelect = (e)=>{
    //To change the dropdown value
    setFilterSelected(e.target.value)

    //Deleting other filters from the URL Search Params
    filterNames.forEach((filterName)=>{
        if(filterName!==e.target.value){
            searchObj.delete(filterName)
        }
    })

    //If filter selected isn't 'all' then it is added to the search params.
    if(e.target.value!=="all"){
        const [filterName, filterValue] = e.target.value.split("_")
        searchObj.set(filterName, filterValue)   
    }

    // The new search params are pushed.
    history.push({
        pathname: location.pathname,
        search: searchObj.toString()
    })

  }

  //Changing the URL /:range from DateRangePicker component
  const handleRangeChange = (selection)=>{
      //Changing the value of the DateRangePicker state
      setRangePicker(selection)

      //Extracting start and end date for the range and constructing the newRange string.
      const startDate = selection.startDate.toISOString().split("T")[0]
      const endDate = selection.endDate.toISOString().split("T")[0]
      
      //Making the new range query in the format startDate_endDate
      const newRange = `${startDate}_${endDate}`
      
      //Pushing the new range to the URL
      history.push({
          pathname:`/${page?page:""}/${newRange}`,
      })
  }

  const handlePageClick = (page)=>{
        history.push({
            pathname: `/${page}/${range?range:""}`,
            search: searchObj.toString()
        })
  }
  return (
    //Displaying the data that is fetched after infering the query from the URL.
    <div className="dashboard">
        <Header />
        <div className="body">
            <div className="filterBar">
                <DatePickerDisplay rangePicker={rangePicker} handleRangeChange={handleRangeChange}/>
                <Filters filterSelected={filterSelected} handleSelect={handleSelect}/>
            </div>
            
            <DisplayRecords launches={launchesState.launches} isLoading={launchesState.isLoading} hasError={launchesState.hasError}/>
            <Pagination currentPage={page} totalPages={launchesState.totalPages} isLoading={launchesState.isLoading} hasError={launchesState.hasError} handlePageClick={handlePageClick}/>
        </div>
    </div>
        
  );
}


export default Dashboard
