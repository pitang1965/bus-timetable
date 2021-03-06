import type { ReactNode, VFC } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

type Props = {
  children: ReactNode;
};

const Layout: VFC<Props> = (props) => {
  return (
    <div className='container grid grid-rows-[76px,auto,30px] p-2 mx-auto max-w-xl min-h-screen bg-gradient-to-r from-violet-300 to-fuchsia-300'>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
