import { Modal } from '@material-ui/core'
import {useMemo} from 'react'
import { useTable } from 'react-table'
import COLUMNS_LAUNCH from './COLUMNS_LAUNCH'

function LaunchDisplay({open, onClose, launchData, isLoading}) {

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
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            {!isLoading && launchData.name?

            <div className="launchView">
                <div className="headerLaunch">
                    <img src={launchData.links.patch.small} />
                    <div className="info">
                        <h1>{launchData.name}</h1>
                        <h6>{launchData.rocket.name}</h6>
                        {launchData.links.article? <a href={launchData.links.article} target="_blank"><img  src="/img/spacex.png"/></a>:""}
                        {launchData.links.wikipedia?  <a href={launchData.links.wikipedia} target="_blank"><img  src="/img/wiki.png"/></a>:""}
                        {launchData.links.webcast? <a href={launchData.links.webcast} target="_blank"><img  src="/img/youtube.png"/></a>:""}
                    </div>
                </div>
                <div className="body">
                    {launchData.details?
                    <p>
                        {launchData.details} 
                        <a href={launchData.links.wikipedia}>Wikipedia</a>
                    </p>
                    :""
                    }

                    {/* Rendering a table using react-table. Making it vertical with style. */}

                    <table  {...getTableProps()}>
                        <thead>
                            {
                                headerGroups.map((headerGroup)=>{
                                    return(
                                    <tr {...headerGroup.getHeaderGroupProps()}>
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
                            {
                                rows.map((row)=>{
                                    prepareRow(row)
                                    return(
                                        <tr {...row.getRowProps()}>
                                            {
                                                row.cells.map((cell)=>{
                                                    return(
                                                        <td {...cell.getCellProps()}>
                                                            {cell.render('Cell')}
                                                        </td>
                                                    )
                                                })
                                            }
                                            <br />
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                </div>
            </div>:
            ""}
        </Modal>
    )
}

export default LaunchDisplay
