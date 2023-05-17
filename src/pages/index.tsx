import { FC, useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Head from 'next/head';
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Authorization from '../components/Authorization';
import Registration from '../components/Registration';
import { IRootState, useAppDispatch } from "../store";
// import { getProfile } from "../store/auth/actionCreators";

const Home: FC = () => {

  // const isLoggedIn = useSelector(
  //   (state: IRootState) => !!state.auth.authData.accessToken
  // );

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getProfile());
  // }, [dispatch]);
  // const Router = typeof window !== 'undefined' ? BrowserRouter : HashRouter;
  return (
    <>
      {/* <BrowserRouter> */}
      <Head>
        <title>Авторизация</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='main'>
        <div className="main__content">
          <div className="container">
            {/* <Routes> */}
            {/* <Route path="/" element={<Authorization />} /> */}
            {/* <Route
                    path="/dashboard"
                    element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
                  /> */}
            {/* </Routes> */}
            <Registration />
            {/* <Authorization /> */}
          </div>
        </div>
      </main>
      {/* </BrowserRouter> */}
    </>
  )
}

export default Home;