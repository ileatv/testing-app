//CoreUI components
import '@coreui/coreui/dist/css/coreui.min.css';
import { CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavbarNav, CNavItem, CNavLink, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider, CForm, CFormInput, CButton, CAvatar, CLink } from '@coreui/react';

//React components
import { FC, useState } from "react";

//Next components
import { useRouter } from 'next/router';

//Styles and images
import dashHeader from '../../styles/Dashboard/DashboardHeader.module.css';

interface DashboardHeaderProps {
    logout: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
    profile: string | null;
}

const DashboardHeader: FC<DashboardHeaderProps> = ({ logout, profile }) => {
    const [visible, setVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <header className={dashHeader.header}>
                <CNavbar expand="lg" colorScheme="light" className={dashHeader.nav}>
                    <CContainer fluid>
                        <CNavbarToggler onClick={() => setVisible(!visible)} />
                        <CCollapse className="navbar-collapse" visible={visible}>
                            <CNavbarNav className={dashHeader.nav__content}>

                                <CNavbarBrand href="#" title='Перейти на главную' className={dashHeader.nav__brand}>
                                    TestingApp
                                </CNavbarBrand>

                                <CNavItem>
                                    <CNavLink href='/UserPages/StudentPage' active={router.pathname === '/UserPages/StudentPage'} title='Перейти на главную' className={`${dashHeader.nav__link} ${dashHeader.nav__link_active} ${router.pathname === '/Dashboard/Dashboard' ? 'active' : `${dashHeader.nav__link}`}`}>
                                        Главная
                                    </CNavLink>
                                </CNavItem>

                                <CNavItem>
                                    <CNavLink href="/Dashboard/Users" active={router.pathname === '/Users'} title='Перейти к таблице пользователей' className={dashHeader.nav__link}>
                                        Пользователям
                                    </CNavLink>
                                </CNavItem>

                                <CDropdown variant="nav-item" popper={false}>
                                    <CDropdownToggle className={dashHeader.nav__link}>Dropdown button</CDropdownToggle>

                                    <CDropdownMenu className={dashHeader.dropdownList}>
                                        <CDropdownItem href="#" className={dashHeader.dropdownList__item}>Action</CDropdownItem>
                                        <CDropdownItem href="#" className={dashHeader.dropdownList__item}>Another action</CDropdownItem>
                                        <CDropdownDivider className={dashHeader.dropdownList__divider} />
                                        <CDropdownItem href="#" className={dashHeader.dropdownList__item}>Something else here</CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>

                                <CNavItem>
                                    <CForm className={dashHeader.search}>
                                        <CFormInput type="search" className={dashHeader.search__input} placeholder="Поиск" title='Введите запрос' />
                                        <CButton type="submit" title='Найти по запросу' className={dashHeader.search__btn}>
                                            Найти
                                        </CButton>
                                    </CForm>
                                </CNavItem>

                                <CDropdown variant="nav-item" popper={false} className={dashHeader.user}>
                                    <CDropdownToggle onClick={toggle} className={dashHeader.nav__link} title='Раскрыть меню пользователя'>
                                        <CAvatar status="success" className={dashHeader.user__avatar}>
                                            {profile === "role_admin" && "ADM"}
                                            {profile === "role_teacher" && "TEACH"}
                                            {profile === "role_student" && "STUD"}
                                        </CAvatar>
                                    </CDropdownToggle>

                                    <CDropdownMenu className={dashHeader.dropdownList}>
                                        <CDropdownItem className={dashHeader.dropdownList__item} title='Перейти к профилю пользователя'>
                                            Профиль
                                        </CDropdownItem>
                                        <CDropdownDivider className={dashHeader.dropdownList__divider} />
                                        <CDropdownItem className={dashHeader.dropdownList__item}>
                                            <button type="button" className={`${dashHeader.user__btn}`} title='Выйти из аккаунта' onClick={logout}>
                                                Выйти
                                            </button>
                                        </CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>

                            </CNavbarNav>

                        </CCollapse>
                    </CContainer>
                </CNavbar>
            </header>
        </>
    );
};

export default DashboardHeader;
