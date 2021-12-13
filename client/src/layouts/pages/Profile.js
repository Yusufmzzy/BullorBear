import React, { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "./Context/UserContext";

const Profile = ()=>{
    let history = useHistory();
    const {currentUser}= useContext(UserContext);
    !currentUser && history.push("/Login")
    return(
        <div>Profile</div>
    )
}

export default Profile;