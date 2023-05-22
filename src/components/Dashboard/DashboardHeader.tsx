import '@coreui/coreui/dist/css/coreui.min.css';
import { CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavbarNav, CNavItem, CNavLink, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider, CForm, CFormInput, CButton, CAvatar, CLink } from '@coreui/react';
import { FC, useState } from "react";
//Next components
import { useRouter } from 'next/router';

//Styles and images
import dashHeader from '../../styles/DashboardHeader.module.css';

const DashboardHeader: FC = () => {
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
                                    <CNavLink href="/Dashboard/Dashboard" active={router.pathname === '/Dashboard/Dashboard'} title='Перейти на главную' className={dashHeader.nav__link}>
                                        Главная
                                    </CNavLink>
                                </CNavItem>

                                <CNavItem>
                                    <CNavLink href="/Dashboard/Users" active={router.pathname === '/Users'} title='Перейти к списку пользователей' className={dashHeader.nav__link}>
                                        Пользователи
                                    </CNavLink>
                                </CNavItem>

                                <CDropdown variant="nav-item" popper={false}>
                                    <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
                                    <CDropdownMenu>
                                        <CDropdownItem href="#">Action</CDropdownItem>
                                        <CDropdownItem href="#">Another action</CDropdownItem>
                                        <CDropdownDivider />
                                        <CDropdownItem href="#">Something else here</CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>

                                <CNavItem>
                                    <CForm className={dashHeader.search}>
                                        <CFormInput type="search" className={dashHeader.search__input} placeholder="Поиск" title='Введите запрос' />
                                        <CButton type="submit" color="success" variant="outline" title='Найти по запросу' className={dashHeader.search__btn}>
                                            Найти
                                        </CButton>
                                    </CForm>
                                </CNavItem>

                                <CDropdown variant="nav-item" popper={false} className={dashHeader.user}>
                                    <CDropdownToggle onClick={toggle}>
                                        <CAvatar status="success" className={dashHeader.user__avatar}>ADM</CAvatar>
                                    </CDropdownToggle>
                                    <CDropdownMenu className={dashHeader.user__list}>
                                        <CDropdownItem className={dashHeader.user__item} title='Перейти к профилю пользователя'>
                                            Профиль
                                        </CDropdownItem>
                                        <CDropdownDivider className={dashHeader.user__divider} />
                                        <CDropdownItem className={dashHeader.user__item}>
                                            <CButton type="button" className={dashHeader.user__btn} title='Выйти из аккаунта'>
                                                Выйти
                                            </CButton>
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
