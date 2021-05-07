// Columns for launch modal 

const COLUMNS_LAUNCH = [
    {
        Header: 'Flight Number',
        accessor: 'flight_number'
    },
    {
        Header: 'Mission Name',
        accessor: 'name'
    },
    {
        Header: 'Rocket Type',
        accessor: 'rocket.type'
    },
    {
        Header: 'Rocket Name',
        accessor: 'rocket.name'
    },
    {
        Header: 'Manufacturer',
        accessor:'payloads[0].manufacturers'
    },
    {
        Header: 'Nationality',
        accessor: 'payloads[0].nationalities'
    },
    {
        Header : 'Launch Date',
        accessor : 'date_utc'
    },
    {
        Header : 'Payload Type',
        accessor : 'payloads[0].type'
    },
    {
        Header : 'Orbit',
        accessor : 'payloads[0].orbit'
    },
    {
        Header: 'Launch Site',
        accessor : 'launchpad.name'
    }
]

export default COLUMNS_LAUNCH