import { Fragment } from 'react';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import '@styles/fonts.css';
import '@styles/global.css';
import '@styles/tailwind.css';

const StarWarsOpeningCrawl = ({ Component, pageProps }: AppProps) => (
  <Fragment>
    <DefaultSeo title="Star Wars Opening Crawl" />
    <Component {...pageProps} />
  </Fragment>
);

export default StarWarsOpeningCrawl;
