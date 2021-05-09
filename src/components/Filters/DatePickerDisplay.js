import React, { useState, useEffect } from 'react'
import { DateRangePicker} from 'react-date-range';
import { Grid, makeStyles, Modal } from '@material-ui/core';
import { staticRanges } from '../helpers';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { format } from 'date-fns';

const useStyles= makeStyles({
    dateModal:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px"
    }
})


function DatePickerDisplay({range, page, history, searchObj}) {
    const classes = useStyles()

    const [rangePicker, setRangePicker] = useState({
        startDate: range? new Date(range.split("_")[0]): new Date(), 
        endDate:range?new Date(range.split("_")[1]) : new Date(),
        key:'selection'
                                                
      })


    useEffect(() => {
       
        let labelChanged = false
        staticRanges.forEach((range)=>{
            if(range.isSelected(rangePicker)){
                setCurrentLabel(range.label)
                labelChanged = true
            }
        })
        if(!labelChanged){
            setCurrentLabel("custom")
        }


    }, [range])

    //Changing the URL /:range from DateRangePicker component
    const handleRangeChange = (selection)=>{
        //Changing the value of the DateRangePicker state
        setRangePicker(selection)

        //Extracting start and end date for the range and constructing the newRange string.
        const startDate = format(selection.startDate, 'yyyy-MM-dd')
        const endDate = format(selection.endDate, 'yyyy-MM-dd')
        
        //Making the new range query in the format startDate_endDate
        const newRange = `${startDate}_${endDate}`
        
        //Pushing the new range to the URL
        history.push({
            pathname:`/${page?page:""}/${newRange}`,
            search: searchObj.toString()
        })
    }

   

    //State to manage Modal of DateRangePicker
    const [open, setOpen] = useState(false)

    //Extracting labels from ranges
    const staticLabels = staticRanges.map((range, index)=>{
        return <option value={range.label} key={index}>{range.label}</option>
    })

    //State to control the dropdown for selected range
    const [currentLabel, setCurrentLabel] = useState("custom")
    

    const handleClearRange = ()=>{
        setRangePicker({
            startDate:new Date(),
            endDate: new Date(),
            key:"selection"
        })
        history.push({
            pathname: `/${page}`,
            search: searchObj.toString()
        })
    }

    const handleClose = ()=>{
        setOpen(false)
    }

    const handleClick = ()=>{
        setOpen(true)
    }

    return (
        <Grid item xs={6}
            container 
            justify="flex-start"
            alignItems ="flex-start"
        >

            <CalendarTodayOutlinedIcon
                color="primary"
                fontSize="small"
            />
            <select 
                value={currentLabel}
                onClick={handleClick}
                id="#rangeInput"
            >
                {staticLabels}
                <option value="custom">Custom</option>
            </select>
            {range?
                    <BackspaceIcon 
                        fontSize="small"
                        onClick ={handleClearRange}
                    />
                :""}
            <Modal
                open={open}
                onClose = {handleClose}
                className={classes.dateModal}
                >
                <DateRangePicker 
                    onChange={(item)=>{handleRangeChange(item.selection)}}
                    showSelectionPreview = {true}
                    moveRangeOnFirstSelection = {false}
                    months={2}
                    ranges={[rangePicker]}
                    direction="horizontal"
                    staticRanges={staticRanges}
                /> 
                
            </Modal>
        </Grid>
    )
}

export default DatePickerDisplay
