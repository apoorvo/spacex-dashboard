import { CircularProgress, makeStyles, Typography, Paper } from '@material-ui/core'
import { useState } from 'react'
import { useTable } from 'react-table'
import LaunchDisplay from './LaunchDisplay'
import MessageBoard from './MessageBoard'

const useStyles = makeStyles((theme)=>({
    progressRoot:{
        position: "absolute",
        top: "45%",
        left: "48%",
        color: theme.palette.primary.light
        
    },
    noResultRoot:{
        fontFamily:theme.typography.fontFamily,
        fontWeight: 400,
    },
    data_table:{
        fontFamily:theme.typography.fontFamily,
        fontSize: theme.typography.fontSize,
        width: "100%",
        textAlign: "left",
        borderCollapse: "collapse",
        "& th":{
            backgroundColor:theme.palette.secondary.light,
            color: theme.palette.secondary.main,
            fontFamily:theme.typography.fontFamily,
            padding: "10px",
        },
    },
    cell:{
        color: theme.palette.primary.main,
        padding: "10px",
    },
    successColumn:{
        fontSize: theme.typography.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
        "& p":{
            textAlign:"center",
            borderRadius: "10px",
            width:"75%",
            margin:"auto",
            padding: "5px 5px 5px 5px"
        }
    },
    success:{
        color: `${theme.palette.success.main}!important`,
        "& p":{
            backgroundColor: theme.palette.success.light,
        }
    },
    failed:{
        color: `${theme.palette.error.main}!important`,
        "& p":{
            backgroundColor: theme.palette.error.light,
        }
    },
    upcoming:{
        color: `${theme.palette.warning.main}!important`,
        "& p":{
            backgroundColor: theme.palette.warning.light,
        }
    }
}))

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
        <Paper elevation={0} variant="outlined">
        <table style={{minHeight: "500px"}}  
        {...getTableProps()} className={classes.data_table}>
            <thead >
                {
                    headerGroups.map((headerGroup)=>{
                        return (<tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column)=>{
                                    return(
                                        <th {...column.getHeaderProps()} style={{textAlign: column.id==="successLabel"? "center":"left"}}>
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
                                        let baseClassName = classes.cell
                                        let labelClassName = ""
                                        if(cell.column.id==="successLabel"){
                                            baseClassName = classes.successColumn
                                            switch(cell.value){
                                                case "Succesful":
                                                    labelClassName = classes.success
                                                    break
                                                case "Failed":
                                                    labelClassName = classes.failed
                                                    break
                                                case "Upcoming":
                                                    labelClassName = classes.upcoming    
                                            }
                                        }
                                        

                                        return(
                                            <td {...cell.getCellProps()} className={`${baseClassName} ${labelClassName}`}>
                                                <p>
                                                {cell.render('Cell')}

                                                </p>
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
        </Paper>
     
        </>
    )
  }

 


export default DisplayTableData
