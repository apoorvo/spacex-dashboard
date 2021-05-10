import { Typography } from "@material-ui/core"


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

export default MessageBoard