import { FC, useEffect } from "react";

//Next components
import { useRouter } from 'next/router';
import Head from 'next/head';

//Store components
import { IRootState, useAppDispatch } from '@/store';

//Redux components
import { useSelector } from 'react-redux';

//actionCreators components
import { logoutUser, getProfile } from '@/store/auth/actionCreators';

//Authorization page
import Authorization from '../Authorization';

//Dashboard components
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import DashboardMain from '@/components/Dashboard/DashboardMain';
import DashboardFooter from '@/components/Dashboard/DashboardFooter';

//Styles
import dash from '../../styles/DashBoard/Dashboard.module.css';

export const AdminPage: FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const profile = useSelector(
        (state: IRootState) => state.auth.profileData.profile
    );

    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
    );

    useEffect(() => {
        dispatch(getProfile());

        if (!isLoggedIn) {
            router.push('/Authorization');
        }
    }, [dispatch, isLoggedIn, router]);

    const logoutHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        await dispatch(logoutUser());
    };

    const renderHandler = (): React.ReactNode => {

        return (

            <div className={dash.wrapper}>
                <DashboardHeader logout={logoutHandler} profile={profile} />
                <DashboardMain />
                <DashboardFooter />
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Testing App - Страница администратора</title>
            </Head>

            {isLoggedIn ? renderHandler() : <Authorization />}
        </>
    )
}

export default AdminPage;