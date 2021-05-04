import { FETCH_LAUNCH_ERROR, FETCH_LAUNCH_REQUEST, FETCH_LAUNCH_SUCCESS } from "./LaunchTypes"


const initialState = {
    isLoading: false,
    hasError: false,
    launches : [],
    totalPages: 0,
    currentPage: 0,
    hasNextPage: false,
    hasPrevPage: false
}


const launchReducer = (state= initialState, action)=>{
    switch(action.type){
        case FETCH_LAUNCH_REQUEST:
            return {
                ...state,
                isLoading: true
            }
            
        case FETCH_LAUNCH_ERROR:
            return {
                ...state,
                hasError: true
            }

        case FETCH_LAUNCH_SUCCESS:
            return{
                isLoading:false,
                hasError: false,
                launches: action.payload.docs,
                currentPage: action.payload.page,
                totalPages: action.payload.totalPages,
                hasPrevPage: action.payload.hasPrevPage,
                hasNextPage: action.payload.hasNextPage
            }
        default:
            return state
    }
}

export default launchReducer