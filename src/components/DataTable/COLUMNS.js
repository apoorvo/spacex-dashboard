//Columns desrbing the headers with their accessor values

const COLUMNS = [
    {
      Header: 'No.',
      accessor: 'flight_number'
    },
    {
      Header: 'Launched(UTC)',
      accessor:'date_utc'
    },
    {
      Header: 'Location',
      accessor: 'launchpad.name'
    },
    {
      Header: 'Mission',
      accessor: 'name'
    },
    {
      Header:'Orbit',
      accessor: 'payloads[0].orbit'
    },
    {
      Header: 'Success',
      accessor:'successLabel'
    },
    {
      Header: 'Rocket',
      accessor: 'rocket.name'
    }
  ]

  export default COLUMNS