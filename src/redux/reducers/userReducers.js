import { userActions } from "../constants/constants";

const initiatsate={
    single:[],
    users:[]
};
export const setUserReducer=(state=initiatsate,{type,payload})=>{
    switch(type){
        case userActions.SET_USER:
            return {
                 single:[],
                 users:payload
                };
            break;
            case userActions.SINGLE_USER:
                return{
                    single:[...state.users.filter((user)=>user.id==payload)],
                    users:[...state.users]
                };
            case userActions.EDIT_USER:
                state.users.filter((user)=>user.id==payload.id).forEach((user)=>(
                    user.name=payload.name,
                    user.email=payload.email,
                    user.phone=payload.phone,
                    user.website=payload.website
                ));
                return{
                    single:[],
                    users:[...state.users]
                };
                break;
                case userActions.DELETE_USER:
                    return {
                        single:[],
                        users:[...state.users.filter((user)=>user.id!=payload)]
                    };
                    break;
                default:
                return state;
    }
}
