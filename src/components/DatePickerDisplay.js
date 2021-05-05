import React, { useState } from 'react'
import { createStaticRanges, DateRangePicker} from 'react-date-range';
import { addDays, addMonths, addYears } from 'date-fns';
import { Modal } from '@material-ui/core';


function DatePickerDisplay({rangePicker, handleRangeChange, handleClearRange}) {
    
    //Creating Custom Static Ranges for the DateRangePicker
    const staticRanges = [...createStaticRanges([
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

    //State to manage Modal of DateRangePicker
    const [open, setOpen] = useState(false)

    //Extracting labels from ranges
    const staticLabels = staticRanges.map((range)=>{
        return <option value={range.label}>{range.label}</option>
    })

    //State to control the dropdown for selected range
    const [currentLabel, setCurrentLabel] = useState("custom")
    

    //Functionality to set state of the dropdown
    //before calling handleRangeChange to set URL
    const handleRange = (selection)=>{
        setOpen(false)
        let labelChanged = false
        staticRanges.forEach((range)=>{
            if(range.isSelected(selection)){
                setCurrentLabel(range.label)
                labelChanged = true
            }
        })
        if(!labelChanged){
            setCurrentLabel("custom")
        }
        handleRangeChange(selection)
    }

    const handleClose = ()=>{
        setOpen(false)
    }

    const handleClick = ()=>{
        setOpen(true)
    }

    return (
        <div>
            <select 
                value={currentLabel}
                onClick={handleClick}
                id="#rangeInput"
            >
                {staticLabels}
                <option value="custom">Custom</option>
            </select>

            <Modal
                open={open}
                onClose = {handleClose}
            >
                <DateRangePicker 
                    onChange={(item)=>{handleRange(item.selection)}}
                    showSelectionPreview = {true}
                    moveRangeOnFirstSelection = {false}
                    months={2}
                    ranges={[rangePicker]}
                    direction="horizontal"
                    staticRanges={staticRanges}
                />  
            </Modal>
        </div>
    )
}

export default DatePickerDisplay
