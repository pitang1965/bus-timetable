import dynamic from 'next/dynamic';
const AboutContents = dynamic(() => import('../components/AboutContents'), {
  loading: () => <div>読み込み中...</div>,
});

const about = () => {
  return <AboutContents />;
};

export default about;
