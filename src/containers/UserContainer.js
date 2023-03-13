import { connect } from "react-redux";
import User from "../components/User";
import { setUser, singleUser } from "../redux/actions/userActions";

const mapStateToProps=state=>({
    userData:state.allusers.users,
    singleData:state.allusers.single
});
const mapDispatchToProps=dispatch=>({
    userDataHandler:(data)=>dispatch(setUser(data)),
    //singleDataHandler:(data)=>dispatch(singleUser(data))
});
export default connect(mapStateToProps,mapDispatchToProps)(User);


