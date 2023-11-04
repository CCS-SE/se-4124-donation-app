import { useAddress } from '@thirdweb-dev/react';

import { NextPage } from 'next';
import WelcomePage from './welcome';
import DonationPage from './donation';

const Home: NextPage = () => {
  const address = useAddress();

  return address ? <DonationPage/> : <WelcomePage />;
};

export default Home;
