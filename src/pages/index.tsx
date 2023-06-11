//React components
import { FC } from 'react';

//Pages
import Main from './Main';

//Layout
import Layout from '@/layouts/layout';

const Home: FC = () => {

  return (
    <>
      <Layout>
        <Main />
      </Layout>
    </>
  )
}

export default Home;