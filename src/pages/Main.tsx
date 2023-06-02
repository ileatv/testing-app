//React components
import { FC, useEffect } from 'react';

//Pages
import Authorization from './Authorization';
import Registration from './Registration';

//Next components
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

//Styles and images
import main from '../styles/Main.module.css';

import logoWebp from "../assets/img/logo.webp";
import logoWebp2x from "../assets/img/logo2x.webp";
import logo from "../assets/img/logo.png";
import logo2x from "../assets/img/logo2x.png";

const Main: FC = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Testing App - Главная</title>
            </Head>

            <main className={main.content}>
                <nav className={main.nav}>
                    <picture className={main.nav__picture}>
                        <source
                            srcSet={`${logoWebp.src} 1x,
                                     ${logoWebp2x.src} 2x`}
                            type="image/webp"
                        />

                        <img
                            src={logo.src}
                            srcSet={`${logo2x.src} 2x`}
                            alt="TestingApp - логотип"
                            className={main.nav__logo}
                        />
                    </picture>

                    <Link href='/Authorization' className={main.nav__link} title='Перейти на страницу авторизации'>
                        Войти
                    </Link>

                    <span className={main.nav__divider}>или</span>

                    <Link href='/Registration' className={main.nav__link} title='Перейти на страницу регистрации'>
                        Зарегистрироваться
                    </Link>
                </nav>
            </main>

            {router.pathname === '/Authorization' && <Authorization />}
            {router.pathname === '/Registration' && <Registration />}
        </>
    )
}

export default Main;