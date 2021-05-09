import {useState, useEffect} from 'react'
import { filterNames } from '../helpers'
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import { Grid } from '@material-ui/core';
function Filters({page, range, searchObj, location, history}) {
    const [filterSelected, setFilterSelected ]= useState("")

    useEffect(() => {
        filterNames.forEach((filterName)=>{
            if(searchObj.has(filterName)){
                setFilterSelected(`${filterName}_${searchObj.get(filterName)}`)
            }else if(!searchObj.toString()){
                setFilterSelected("")
            }
        })
    }, [page, range, searchObj.toString()])

    
    //Changing URL depending on the dropdown selected.
    //We will only allow one filter to be applied
    const handleSelect = (e)=>{
        //To change the dropdown value
        setFilterSelected(e.target.value)

        //Deleting other filters from the URL Search Params
        filterNames.forEach((filterName)=>{
                searchObj.delete(filterName)
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
    return (
        <Grid item container 
            justify="flex-end"
            alignItems ="flex-start"
            xs={6}
        >
            <FilterListOutlinedIcon 
                color="primary"
                fontSize="small"
            />
            <select value={filterSelected} onChange={handleSelect}>                
                <option value="all">
                    All Launches</option>
                <option value="success_true">Succesful</option>
                <option value="success_false">Failed</option>
                <option value="upcoming_true">Upcoming</option>
                <option value="upcoming_false">Past</option>
            </select>
        </Grid>
    )
}

export default Filters
