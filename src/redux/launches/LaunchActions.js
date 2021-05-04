import {FETCH_LAUNCH_ERROR, FETCH_LAUNCH_REQUEST, FETCH_LAUNCH_SUCCESS} from "./LaunchTypes"
import axios from "axios"

export const fetchLaunchesRequest = ()=>{
    return{
        type:FETCH_LAUNCH_REQUEST,
    }
}

export const fetchLaunchesSuccess = (launches) =>{
    return{
        type: FETCH_LAUNCH_SUCCESS,
        payload: launches
    }
}

export const fetchLaunchesError = () =>{
    return{
        type: FETCH_LAUNCH_ERROR,
    }
}

export const fetchLaunches = ({queryBody,page})=>{
    return function(dispatch){
        dispatch(fetchLaunchesRequest())
        axios.post('https://api.spacexdata.com/v4/launches/query',{
        query: queryBody,
        // If sorting and limit needs to updated moving forward options can also be taken from the dispatcher. 
        // For now there is no such requirment.
        options:{
            limit: 12,
            page: page,
            sort: {date_unix:"desc"}
        }
        })
        .then((res)=>{
            dispatch(fetchLaunchesSuccess(res.data))
        })
        .catch((err)=> dispatch(fetchLaunchesError()))
    }
    
}