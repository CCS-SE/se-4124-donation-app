import { useAddress } from '@thirdweb-dev/react';

import { NextPage } from 'next';
import WelcomePage from './welcome';
import FundraisersPage from './fundraiser';

const Home: NextPage = () => {
  const address = useAddress();

  return address ? <FundraisersPage /> : <WelcomePage />;
};

export default Home;
