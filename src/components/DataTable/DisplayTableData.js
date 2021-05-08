import { CircularProgress, makeStyles, Typography } from '@material-ui/core'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTable } from 'react-table'
import LaunchDisplay from './LaunchDisplay'

const useStyles = makeStyles({
    progressRoot:{
        position: "absolute",
        top: "45%",
        left: "48%"
    },
    noResultRoot:{
        fontWeight: 400,
    }
})

function DisplayTableData({columns, data, isLoading, hasError}){

    const classes = useStyles()
    //A basic react-table compliant component that renders out our main table.
    const [openLaunch,setOpenLaunch] = useState(false)
    const [currentLaunch, setCurrentLaunch] = useState("")

    const onCloseLaunch = ()=>{
        setOpenLaunch(false)
    }

    const handleRowCLick= (launch)=>{
        setCurrentLaunch(launch)
        setOpenLaunch(true)
    }

    const tableInstance = useTable({
        columns,
        data
    })

    const {
        getTableProps, 
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return(
        <>
        <LaunchDisplay open={openLaunch} onClose={onCloseLaunch} launchData={currentLaunch} isLoading={isLoading} />
        <table style={{minHeight: "500px"}}  
        {...getTableProps()} className="data_table">
            <thead >
                {
                    headerGroups.map((headerGroup)=>{
                        return (<tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column)=>{
                                    return(
                                        <th {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                        </th>
                                    )
                                })
                            }

                        </tr>)
                    })
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                
                { !isLoading?
                   rows.map((row)=>{
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} onClick={()=>{handleRowCLick(row.original)}} >
                                {
                                    row.cells.map((cell)=>{
                                        return(
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    }
                        
                    ):
                    
                    <CircularProgress classes={{
                        root:classes.progressRoot
                    }} thickness={6} size={60}/>
                }
                
                <MessageBoard rowsLength={rows.length} isLoading={isLoading} hasError={hasError} columnsLength={columns.length} classes={classes.noResultRoot}/>
                
            </tbody>      
        </table>
        </>
    )
  }

 
function MessageBoard({rowsLength, isLoading, hasError, columnsLength, classes}){
    if(!isLoading){
        if(hasError){
            return(
                <tr>
                    <td colSpan={columnsLength} valign="top" align="center">
                    <Typography
                        variant="h6"
                        component="h6"
                        classes={{h6:classes}}
                    >
                        Error fetching records.
                    </Typography>
                    </td>
                </tr>
            )
        }else if(rowsLength<=0){
            return(
                <tr>
                    <td colSpan={columnsLength} valign="top" align="center">
                    <Typography
                        variant="h6"
                        component="h6"
                        classes={{h6:classes}}
                    >
                        No results found for the specified filter
                    </Typography>
                    </td>
                </tr>
            )
        }else{
            return ""
        }
    }else{
        return ""
    }

   
        
}

export default DisplayTableData
