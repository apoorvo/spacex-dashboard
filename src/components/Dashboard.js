import {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { useParams, useLocation, useHistory } from 'react-router';
import { fetchLaunches } from "../redux";
import {checkUrlValidity, getQueryFromUrl} from "./helpers"

import Filters from "./Filters/Filters"
import DisplayRecords from "./DataTable/DisplayRecords"
import DatePickerDisplay from "./Filters/DatePickerDisplay"
import PaginationDisplay from './Filters/PaginationDisplay';

import Header from './Header';
import { Grid, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme)=>({
    filterBar:{
        "& select":{
            border: "0",
            marginBottom: "20px",
            color:theme.palette.secondary.main,
            fontFamily: theme.typography.fontFamily,
            fontWeight: theme.typography.fontWeightMedium
        }
    }
}))
//We will be using the URL to infer what the query for the fetchLaunches action should be.
//The url pattern is /:page/:range?filterName=filterValue
//NOTE: the code is made such that pattern can reasonably tolerate null values.

function Dashboard() {

  const classes = useStyles()
  const dispatch = useDispatch()
  //Currently we are loading the entire state. 
  const launchesState = useSelector((state)=>state.launches)
  const {page, range} = useParams()
  
  
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
    
  }, [page, range, location.search])
  // Since the effect is dependent on URL Params page and range, after the redirect the 
  // fetchLaunches action is deployed as well. 

  return (
    //Displaying the data that is fetched after infering the query from the URL.
    <Grid container direction="column" justify="center" alignItems="center" >
        <Header />
        <Grid item xs={8} container direction="column" justify="center" spacing={2}>
            <Grid item xs={12} container direction="row"  justify="space-between" classes={{root:classes.filterBar}}>
                <DatePickerDisplay history={history} searchObj={searchObj} page={page} range={range} />
                <Filters history={history} searchObj={searchObj} page={page} range={range} location={location} history={history}/>
            </Grid>
            
            <DisplayRecords launches={launchesState.launches} isLoading={launchesState.isLoading} hasError={launchesState.hasError}/>
            <Grid item xs={12} container justify="flex-end" >
            <PaginationDisplay totalPages={launchesState.totalPages} currentPage={launchesState.currentPage} isLoading={launchesState.isLoading} history={history} range={range} searchObj={searchObj}/>
            </Grid>
        </Grid>
    </Grid>
        
  );
}


export default Dashboard
