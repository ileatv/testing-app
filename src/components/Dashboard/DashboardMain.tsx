//React components
import { FC } from 'react';

//CoreUI components
import { CContainer } from '@coreui/react';

//Dashboard components and styles
import dashMain from '../../styles/DashBoard/DashboardMain.module.css';

const DashboardMain: FC = () => {
    return (
        <>
            <main className={dashMain.main}>
                <CContainer fluid>
                    <section className={dashMain.main__content}>
                        <h1 className={dashMain.main__title}>К сожалению, данный раздел находится в разработке :( <br /> Приносим свои извинения!</h1>
                    </section>
                </CContainer>
            </main>
        </>
    )
}

export default DashboardMain;