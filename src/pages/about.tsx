import { lazy } from 'react';
const AboutContents = lazy(() => import('../components/AboutContents'));

const about = () => {
  return (
    <AboutContents />
  );
};

export default about;
