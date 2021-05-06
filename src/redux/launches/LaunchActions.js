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
        console.log(queryBody)
        axios.post('https://api.spacexdata.com/v4/launches/query',{
        query: queryBody,
        
        //Query has been updated to populate specific fields and select only required fields.
        options:{
            select:["date_utc","date_unix","success","upcoming", "flight_number", "name","details", "links"],
            limit: 12,
            page: page, 
            populate:[
                {path: "payloads", options:{select:["orbit","manufacturers","nationalities","type"]}},
                {path: "launchpad",options:{select:["name"]}},
                {path:"rocket", options:{select: ["name","type"]}}
            ]
        }
        })
        .then((res)=>{
            dispatch(fetchLaunchesSuccess(res.data))
        })
        .catch((err)=> dispatch(fetchLaunchesError()))
    }
    
}