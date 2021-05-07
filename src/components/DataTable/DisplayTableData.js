import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTable } from 'react-table'
import LaunchDisplay from './LaunchDisplay'

function DisplayTableData({columns, data, isLoading, hasError}){

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
        {!isLoading && currentLaunch?
        <LaunchDisplay open={openLaunch} onClose={onCloseLaunch} launchData={currentLaunch} isLoading={isLoading}/>:
            ""}
        <table  {...getTableProps()} className="data_table">
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
                    }):
                    "Loading..."
                }
                {hasError? "Error fetching the data":""}
                
            </tbody>
        </table>
        </>
    )
  }

 

export default DisplayTableData
