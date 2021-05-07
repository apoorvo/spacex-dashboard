import DisplayTableData from "./DataTable/DisplayTableData"
import COLUMNS from './DataTable/COLUMNS'
import React, { useMemo} from 'react'
import LaunchDisplay from "./DataTable/LaunchDisplay"



function DisplayRecords({launches, isLoading, hasError}){
    //Columns and Row preparation for react-table
    const columns = useMemo(()=>{
        return COLUMNS
    },[])

    // Success_label is added to the data to display Success field in the table
    const data = useMemo(()=>{
        const rowData= launches.map((row)=>{
          const newRow = {...row}
          if(newRow.upcoming){
            newRow.success_label = "Upcoming"
            return newRow
          }else{
            newRow.success_label= newRow.success? "Succesful": "Failure"
          }
          return newRow 
      })
      return rowData
    }, [launches]) 
       

    return(
      <>
        <DisplayTableData columns={columns} data={data} isLoading={isLoading} hasError={hasError} />        
    
      </>
    )
}

export default DisplayRecords