import { useTable } from 'react-table'

function DisplayTableData({columns, data, isLoading, hasError}){

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
