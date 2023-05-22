import { FC, useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Authorization from './Authorization';
import Registration from './Registration';
import Main from './Main';
import Layout from '@/layouts/layout';
import { IRootState, useAppDispatch } from "../store";
// import { getProfile } from "../store/auth/actionCreators";

const Home: FC = () => {

  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getProfile());
  // }, [dispatch]);

  return (
    <>
      <Layout>
        <Main />
      </Layout>
    </>
  )
}

export default Home;