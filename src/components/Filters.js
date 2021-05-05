import React from 'react'

function Filters({filterSelected, handleSelect}) {
    return (
        <>
            <select value={filterSelected} onChange={handleSelect}>
                <option value="all">All Launches</option>
                <option value="success_true">Succesful</option>
                <option value="success_false">Failed</option>
                <option value="upcoming_true">Upcoming</option>
                <option value="upcoming_false">Past</option>
            </select>
        </>
    )
}

export default Filters
