import '@coreui/coreui/dist/css/coreui.min.css';
import { FC, useState } from "react";
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import DashboardFooter from '@/components/Dashboard/DashboardFooter';

const Dashboard: FC = () => {

    return (
        <>
            <DashboardHeader />
            <DashboardFooter />
        </>
    );
};

export default Dashboard;
