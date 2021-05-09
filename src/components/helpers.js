// This is a helper file used for common usecases like getting the query for the API call, checking validity of the URL 
// and any further usecases arriving in the future

//For DateRangePicker
import { addDays, addMonths, addYears } from 'date-fns';
import { createStaticRanges } from 'react-date-range';
 //Creating Custom Static Ranges for the DateRangePicker
 export const staticRanges = [...createStaticRanges([
    {
        label: "Past Week",
        range: ()=>({
            startDate: addDays(new Date(),-7),
            endDate: new Date(),
        })    
    },
    {
        label: "Past Month",
        range: ()=>({
            startDate: addMonths(new Date(),-1),
            endDate: new Date(),
        })    
    },
    {
        label: "Past 3 Months",
        range: ()=>({
            startDate: addMonths(new Date(),-3),
            endDate: new Date(),
        })    
    },
    {
        label: "Past 6 Months",
        range: ()=>({
            startDate: addMonths(new Date(),-6),
            endDate: new Date(),
        })    
    },
    {
        label: "Past Year",
        range: ()=>({
            startDate: addYears(new Date(),-1),
            endDate: new Date(),
        })    
    },
    {
        label: "Past 2 Years",
        range: ()=>({
            startDate: addYears(new Date(),-2),
            endDate: new Date(),
        })    
    },

])
]

//The names of the filters to be applied
//Only one can be applied at the time as applying upcoming filter will return docs
//with a null value for success.

//Simillarly the filter combination success+past launches or failed + past launches
//will be achieved by by just applying the success filter
export const filterNames = ["success", "upcoming"]

export const getQueryFromUrl = (range, searchObj)=>{
    let rangeApplied = {}
    let filterApplied = {}

    if(range){
        let [startDate, endDate] = range.split("_")
        if(range.split("_").length>1 && Date.parse(startDate) && Date.parse(endDate)){
            console.log("works")
            startDate = new Date(startDate).getTime()/1000
            endDate = new Date(endDate).getTime()/1000
            rangeApplied.date_unix = {$gte: startDate, $lte: endDate}
        }
        else{
            console.log("Doesn't Work")
        }
    }

    if(searchObj.toString()){
        filterNames.forEach((filter)=>{
            if(searchObj.has(filter)){
                filterApplied = {}
                filterApplied[filter]= searchObj.get(filter)  
            }
        })
    }
    console.log(`Filter applied: ${filterApplied}`)
    return {...rangeApplied, ...filterApplied}
}

export const checkUrlValidity = function(page, range){
    let isValid = true
    let pageNew = page
    let rangeNew = range
    if(!parseInt(page)){
        isValid = false
        pageNew = 1
    }
    if(range){
        const [startDate,endDate] = range.split("_") 
        if(!Date.parse(startDate) || !Date.parse(endDate)){
            isValid = false
            rangeNew = ""
        }
    }

   

    return {isValid, newUrl : `/${pageNew}/${rangeNew}`}
}

