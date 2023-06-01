import { FC } from 'react';
import Head from 'next/head';
import { RouterProvider, BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';

type Props = {
    children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
    //В компоненте Layout переменная {children} используется 
    //для рендеринга дочерних элементов 
    //компонента внутри контейнера div.
    return (
        <>
            <Head>
                <title>Testing App - Главная</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

            </Head>

            <main className='main'>
                <div className="container">
                    {children}
                </div>
            </main>
        </>
    )
}

export default Layout;