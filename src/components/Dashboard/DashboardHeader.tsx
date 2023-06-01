//CoreUI components
import '@coreui/coreui/dist/css/coreui.min.css';
import { CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavbarNav, CNavItem, CNavLink, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider, CForm, CFormInput, CButton, CAvatar, CLink } from '@coreui/react';

//React components
import { FC, useState } from "react";

//Next components
import { useRouter } from 'next/router';

//Styles and images
import dashHeader from '../../styles/Dashboard/DashboardHeader.module.css';

const DashboardHeader: FC = () => {
    const [visible, setVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const toggle = () => setIsOpen(!isOpen);

    const handleLogout = async () => {
        // // Получаем access и refresh токены из cookies или localStorage
        // const accessToken = Cookies.get('access_token') || localStorage.getItem('access_token');
        // const refreshToken = Cookies.get('refresh_token') || localStorage.getItem('refresh_token');

        // // Проверяем, существуют ли токены
        // if (accessToken || refreshToken) {
        //     // Удаляем токены
        //     Cookies.remove('access_token');
        //     Cookies.remove('refresh_token');
        //     localStorage.removeItem('access_token');
        //     localStorage.removeItem('refresh_token');

        //     // Делаем запрос на сервер для удаления токенов
        //     // ...

        //     // Перенаправляем пользователя на страницу входа
        //     window.location.href = '/login';
        // }
        await router.push('/Authorization');
    }

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
                                    <CNavLink href="/Dashboard/Dashboard" active={router.pathname === '/Dashboard/Dashboard'} title='Перейти на главную' className={`${dashHeader.nav__link} ${dashHeader.nav__link_active} ${router.pathname === '/Dashboard/Dashboard' ? 'active' : `${dashHeader.nav__link}`}`}>
                                        Главная
                                    </CNavLink>
                                </CNavItem>

                                <CNavItem>
                                    <CNavLink href="/Dashboard/Users" active={router.pathname === '/Users'} title='Перейти к таблице пользователей' className={dashHeader.nav__link}>
                                        Пользователи
                                    </CNavLink>
                                </CNavItem>

                                <CDropdown variant="nav-item" popper={false}>
                                    <CDropdownToggle className={dashHeader.nav__link}>Dropdown button</CDropdownToggle>

                                    <CDropdownMenu className={dashHeader.dropdownList}>
                                        <CDropdownItem href="#" className={dashHeader.dropdownList__item}>Action</CDropdownItem>
                                        {/* <CDropdownDivider className={dashHeader.dropdownList__divider} /> */}
                                        <CDropdownItem href="#" className={dashHeader.dropdownList__item}>Another action</CDropdownItem>
                                        <CDropdownDivider className={dashHeader.dropdownList__divider} />
                                        <CDropdownItem href="#" className={dashHeader.dropdownList__item}>Something else here</CDropdownItem>
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
                                    <CDropdownToggle onClick={toggle} className={dashHeader.nav__link}>
                                        <CAvatar status="success" className={dashHeader.user__avatar}>ADM</CAvatar>
                                    </CDropdownToggle>

                                    <CDropdownMenu className={dashHeader.dropdownList}>
                                        <CDropdownItem className={dashHeader.dropdownList__item} title='Перейти к профилю пользователя'>
                                            Профиль
                                        </CDropdownItem>
                                        <CDropdownDivider className={dashHeader.dropdownList__divider} />
                                        <CDropdownItem className={dashHeader.dropdownList__item}>
                                            <CButton type="button" className={`${dashHeader.user__btn}`} title='Выйти из аккаунта' onClick={handleLogout}>
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
