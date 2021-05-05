function DisplayRecords({launches, isLoading, hasError}){
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


export default DisplayRecords