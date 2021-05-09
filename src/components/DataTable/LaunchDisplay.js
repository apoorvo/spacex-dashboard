import { makeStyles, Modal,Paper } from '@material-ui/core'
import {useMemo} from 'react'
import { useTable } from 'react-table'
import COLUMNS_LAUNCH from './COLUMNS_LAUNCH'


const useStyles = makeStyles((theme)=>({
    '@global':{
        '*::-webkit-scrollbar':{
            width:"0.5em",
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey',
          }
    },
    launchView:{
        color: theme.palette.primary.main,
        fontFamily: theme.typography.fontFamily,
        width: "500px",
        maxHeight: "600px",
        overflowY:"auto",
        backgroundColor: "white",
        border: "1px solid white",
        margin: "auto",
        marginTop: "20px",
        padding:"10px",
        borderRadius: "10px",
        outline:"none",
    },
    headerView:{
        width: "90%",
        margin:"auto",
        display: "flex",
        minHeight: "100px",
        boxShadow: "0px",
        marginTop: "10px",
        paddingBottom:"10px",
        "& img":{
            width: "72px",
            height: "72px",
            marginRight: "10px"
        },
        "& h1":{
            fontWeight: theme.typography.fontWeightRegular,

        }
    },
    info:{
        marginTop: "10px",
        "& a img":{
            width: "17px",
            height: "auto",
            padding:"0"            
        }
    },
    body:{
        width: "90%",
        margin: "auto",     
        "& table":{
            marginTop: "20px",
            textAlign: "left",
            borderCollapse: "collapse",
            width: "100%",
        },
        "& table tr":{
            marginRight: "20px",
            borderBottom: "1px solid rgb(175, 175, 175)",
            padding: "15px 15px 15px 0px",
            "& td, & th":{
                fontWeight: theme.typography.fontWeightRegular,      
                padding: "10px",
                borderBottom: `1px solid ${theme.palette.primary.light}`
            }
        },

    },
    
    successColumn:{
        fontSize: theme.typography.fontSize,
        padding: "5px",
        borderRadius: "10px",
        verticalAlign: "top",
        marginLeft:"5px",
        fontWeight: theme.typography.fontWeightMedium,
    },
    success:{
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.light,   
    },
    failed:{
        color: theme.palette.error.main,
        backgroundColor: theme.palette.error.light,
    },
    upcoming:{
        color: theme.palette.warning.main,
        backgroundColor: theme.palette.warning.light,
    }
}))



function LaunchDisplay({open, onClose, launchData, isLoading}) {
    const classes = useStyles()

    let labelClass = launchData.upcoming? classes.upcoming:
                    (launchData.success? classes.success: classes.failed)   
    //Accessing the columns for the launch
    const COLUMNS = COLUMNS_LAUNCH

    const columns = useMemo(() => COLUMNS ,[])
    //The details for the launch
    const data = useMemo(() => [launchData], [launchData])

    const tableInstance = useTable({
        columns,
        data
    })

    const {
        getTableProps, 
        rows,
        prepareRow,
    } = tableInstance

    
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            {!isLoading && launchData.name?

            <Paper 
            classes={{root:classes.launchView}}
                elevation={2}
            >
                <div className={classes.headerView}>
                    <img src={launchData.links.patch.small} />
                    <div className={classes.info}>
                        <h1>{launchData.name}
                        {console.log(launchData.success)}
                        <span className={`${classes.successColumn} ${labelClass}`}>
                                {launchData.successLabel}
                            </span></h1>
                        <h6>{launchData.rocket.name}</h6>
                        {launchData.links.article? <a href={launchData.links.article} target="_blank"><img  src="/img/spacex.png"/></a>:""}
                        {launchData.links.wikipedia?  <a href={launchData.links.wikipedia} target="_blank"><img  src="/img/wiki.png"/></a>:""}
                        {launchData.links.webcast? <a href={launchData.links.webcast} target="_blank"><img  src="/img/youtube.png"/></a>:""}
                    </div>
                </div>
                <div className={classes.body}>
                    {launchData.details?
                    <p>
                        {launchData.details} 
                        <a href={launchData.links.wikipedia}>Wikipedia</a>
                    </p>
                    :""
                    }


                    <table  {...getTableProps()}>
                            {
                                rows.map((row)=>{
                                    prepareRow(row)
                                    return row.cells.map((cell)=>{

                                    return(
                                        <tr {...row.getRowProps()} >
                                                <th>
                                                    {cell.column.Header}
                                                </th>
                                                <td {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </td>
                                        </tr>
                                         )
                                    })
                                })
                            }

                    </table>
                </div>
            </Paper>:
            ""}
        </Modal>
    )
}

export default LaunchDisplay
