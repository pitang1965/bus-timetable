import type { ReactNode, VFC } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

type Props = {
  children: ReactNode;
};

const Layout: VFC<Props> = (props) => {
  return (
    <div className='container min-h-screen p-2 mx-auto max-w-xl bg-blue-100'>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
