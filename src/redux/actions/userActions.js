import { userActions } from "../constants/constants";

export const setUser=(data)=>{
    return {
        type:userActions.SET_USER,
        payload:data
    }
}
export const singleUser=(id)=>{
    return {
        type:userActions.SINGLE_USER,
        payload:id
    }
}
export const editUser=(data)=>{
    return {
        type:userActions.EDIT_USER,
        payload:data
    }
}
export const deleteUser=(id)=>{
    return {
        type:userActions.DELETE_USER,
        payload:id
    }
}