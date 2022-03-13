import dynamic from 'next/dynamic';
const AboutPageContents = dynamic(() => import('../components/AboutPageContents'), {
  loading: () => <div>読み込み中...</div>,
});

const about = () => {
  return <AboutPageContents />;
};

export default about;
