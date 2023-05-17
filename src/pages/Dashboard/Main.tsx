import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import Login from "../../components/Authorization";


const Main = () => {

    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
    );

    return (
        <div>
            <h1>Main Profile</h1>
            {isLoggedIn ? <div>Вы успушно авторизовались</div> : <Login />}
        </div>
    );
};

export default Main;