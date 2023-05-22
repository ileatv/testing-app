import { CFooter, CLink } from '@coreui/react';
import { FC } from 'react';


const DashboardFooter: FC = () => {
    return (
        <CFooter>
            <div>
                <CLink href="https://coreui.io">pfctngr.ru</CLink>
                <span>&copy; 2023 TestingApp.</span>
            </div>
            <div>
                <span>Powered by </span>
                <CLink href="https://coreui.io">CoreUI</CLink>
            </div>
        </CFooter>
    );
}

export default DashboardFooter;