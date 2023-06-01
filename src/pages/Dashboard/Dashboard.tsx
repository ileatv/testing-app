//React components
import { FC, useEffect, useState } from "react";

//CoreUI components and styles
import '@coreui/coreui/dist/css/coreui.min.css';

//Dashboard components and styles
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import DashboardFooter from '@/components/Dashboard/DashboardFooter';
import DashboardMain from '@/components/Dashboard/DashboardMain';
import dash from '../../styles/DashBoard/Dashboard.module.css';
//Next components
import { useRouter } from 'next/router';

//Redux components
import { useSelector } from 'react-redux';

//Store components
import { IRootState, useAppDispatch } from '@/store';
import Authorization from '../Authorization';

//Private route component
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import { logoutUser } from '@/store/auth/actionCreators'; //getProfile,

const Dashboard: FC = () => {
    const [isMounted, setIsMounted] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();

    // useEffect(() => {
    //     if (router !== null) {
    //         router.push('/Authorization');
    //     }
    // }, [router]);

    // const profile = useSelector(
    //     (state: IRootState) => state.auth.profileData.profile
    // );

    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
    );

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            await dispatch(logoutUser());
            if (document.cookie !== undefined) {
                const cookies = document.cookie.split(";").map(cookie => cookie.trim());
                const auth_cookie = cookies.find(cookie => cookie.startsWith("auth_token="));
                if (auth_cookie !== undefined) {
                    const auth_token = auth_cookie.split("=")[1];
                    // Используем переменную auth_token здесь
                    console.log(auth_token);
                }
            }

        } catch (error) {
            console.error(error);
        }
    };

    const renderProfile = (): React.ReactNode => {
        // <div className="">
        //     <h1>Профиль</h1>
        //     <p>Вы в профиле, {Profile}</p>
        //     <button onClick={() => dispatch(logoutUser())}></button>
        // </div>
        return (

            <div>
                <div>Вы успушно авторизовались</div>
                <button
                    onClick={handleLogout}
                >
                    Logout
                </button>
                {/* <button onClick={() => dispatch(getProfile())}>update profile</button> */}
            </div>
            // <div className={dash.wrapper}>
            //     <DashboardHeader />
            //     <DashboardMain />
            //     <DashboardFooter />
            // </div >
        )
    }

    return (
        <>
            <PrivateRoute>

                {isLoggedIn ?
                    renderProfile() : <Authorization />
                }

            </PrivateRoute>
            {/* <div className={dash.wrapper}>
                <DashboardHeader />
                <DashboardMain />
                <DashboardFooter />
            </div > */}

            {/* {profile && (
                <div>
                    <p>Username: {profile.username}</p>
                    <p>Role: {profile.role}</p>
                </div>
            )} */}
        </>
    );
};

export default Dashboard;
