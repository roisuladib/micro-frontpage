import Router from 'next/router';
import { ToastContainer } from 'react-toastify';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css'
import 'react-toastify/dist/ReactToastify.min.css'
import '../styles/globals.css';

NProgress.configure({ showSpinner: false, speed: 500, minimum: 0.1 });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps }) => {
  return <>
    <Component {...pageProps} />
    <ToastContainer autoClose={3000} />
  </>;
}

export default MyApp
