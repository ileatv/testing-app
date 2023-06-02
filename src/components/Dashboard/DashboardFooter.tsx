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
                <div className={dashFooter.footer__group}>
                    <CLink href="https://coreui.io" className={dashFooter.footer__link} title='Перейти на веб-сайт разработчика TestingApp'>
                        TestingApp
                    </CLink>
                    <span> &copy;2023 TestingApp.</span>
                </div>
                <div className={dashFooter.footer__group}>
                    <span>Powered by&nbsp;</span>
                    <CLink href="https://coreui.io" className={dashFooter.footer__link} title='Перейти на веб-сайт CoreUI'>
                        CoreUI
                    </CLink>
                </div>
            </CFooter>
        </footer>
    );
}

export default DashboardFooter;