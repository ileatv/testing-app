//React components
import { FC, useEffect } from 'react';

//Pages
import Authorization from './Authorization';
import Registration from './Registration';

//Next components
import Link from 'next/link';
import { useRouter } from 'next/router';

//Styles and images
import main from '../styles/Main.module.css';
import Image from 'next/image';
import logo from "../assets/img/logo.png";

const Main: FC = () => {
    const router = useRouter();

    return (
        <>
            <section className={main.content}>
                <nav className={main.nav}>
                    <Image
                        src={logo}
                        alt="TestingApp logo"
                        className={main.nav__logo}
                    />
                    <Link href='/Authorization' className={main.nav__link} title='Войти в аккаунт'>
                        Войти
                    </Link>
                    <span className={main.nav__divider}>или</span>
                    <Link href='/Registration' className={main.nav__link} title='Зарегистрировать аккаунт'>
                        Зарегистрироваться
                    </Link>
                </nav>
            </section>

            {router.pathname === '/Authorization' && <Authorization />}
            {router.pathname === '/Registration' && <Registration />}
        </>
    )
}

export default Main;