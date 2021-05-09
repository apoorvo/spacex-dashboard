import DisplayTableData from "./DisplayTableData"
import COLUMNS from './COLUMNS'
import React, { useMemo} from 'react'
import LaunchDisplay from "./LaunchDisplay"



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
            newRow.successLabel = "Upcoming"
          }else{
            newRow.successLabel= newRow.success? "Succesful": "Failed"
          }
          let [date,time] = newRow.date_utc.split("T")
          time = time.split(":").slice(0,2).join(":")
          newRow.date_utc = `${date}  ${time}`
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