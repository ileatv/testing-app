//React components
import { FC, useState } from "react";

//CoreUI components and styles
import '@coreui/coreui/dist/css/coreui.min.css';

//Dashboard components and styles
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import DashboardFooter from '@/components/Dashboard/DashboardFooter';
import DashboardMain from '@/components/Dashboard/DashboardMain';
import dash from '../../styles/DashBoard/Dashboard.module.css';

const Dashboard: FC = () => {

    return (
        <>
            <div className={dash.wrapper}>
                <DashboardHeader />
                <DashboardMain />
                <DashboardFooter />
            </div >

        </>
    );
};

export default Dashboard;
