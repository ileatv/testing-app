//React components
import { FC, useEffect, useState } from "react";

//CoreUI components and styles
import '@coreui/coreui/dist/css/coreui.min.css';

//Dashboard components and styles
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import DashboardFooter from '@/components/Dashboard/DashboardFooter';
import DashboardMain from '@/components/Dashboard/DashboardMain';

//Next components
import { useRouter } from 'next/router';

//Redux components
import { useSelector } from 'react-redux';

//Store components
import { IRootState, useAppDispatch } from '@/store';

//Authorization components
import Authorization from '../Authorization';

//Private route component
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';

//actionCreators components
import { logoutUser } from '@/store/auth/actionCreators'; //getProfile,

//Styles
import dash from '../../styles/DashBoard/Dashboard.module.css';


const Dashboard: FC = () => {

    const dispatch = useAppDispatch();
    const router = useRouter();

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

        } catch (error) {
            console.error(error);
        }
    };

    const renderProfile = (): React.ReactNode => {

        return (

            //     {/* <button onClick={() => dispatch(getProfile())}>update profile</button> */}

            <div className={dash.wrapper}>
                <DashboardHeader logout={handleLogout} />
                <DashboardMain />
                <DashboardFooter />
            </div>
        )
    }

    return (
        <>
            <PrivateRoute>

                {isLoggedIn ?
                    renderProfile() : <Authorization />
                }

            </PrivateRoute>
        </>
    );
};

export default Dashboard;
