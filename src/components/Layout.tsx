import type { ReactNode, FC } from 'react';
import Navbar from 'src/components/Navbar';
import Footer from 'src/components/Footer';

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = (props) => {
  return (
    <div className='container mx-auto grid min-h-screen max-w-xl grid-rows-[76px,auto,30px] bg-gradient-to-r from-violet-300 to-fuchsia-300 p-2'>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
