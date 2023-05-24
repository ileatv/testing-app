//React components
import { FC } from 'react';

//CoreUi components and styles
import { CFooter, CLink } from '@coreui/react';

//Dashboard components and styles
import dashFooter from '../../styles/DashBoard/DashboardFooter.module.css';

const DashboardFooter: FC = () => {
    return (
        <footer className={dashFooter.footer}>
            <CFooter className={dashFooter.footer__content}>
                <div>
                    <CLink href="https://coreui.io" className={dashFooter.footer__link}>
                        TestingApp
                    </CLink>
                    <span> &copy;2023 TestingApp.</span>
                </div>
                <div>
                    <span>Powered by </span>
                    <CLink href="https://coreui.io" className={dashFooter.footer__link}>
                        CoreUI
                    </CLink>
                </div>
            </CFooter>
        </footer>
    );
}

export default DashboardFooter;