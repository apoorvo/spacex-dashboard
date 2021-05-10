import { makeStyles, Paper } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    header:{
        width:"100%", 
        display:"flex", 
        justifyContent:"center",
        padding:"10px 0px 20px 0px", 
        marginBottom:"20px",
        "& img":{
            width:"250px"
        }
    }
})

function Header() {
    const classes = useStyles()
    return (
        <Paper className={classes.header} square={true}>
         <img src={"/img/logo.png"} alt="SpaceX Logo"/>   
        </Paper>
    )
}

export default Header
