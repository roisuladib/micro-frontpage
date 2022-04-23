import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Clients from "../components/Clients";
import Courses from "../components/Courses";
import Categories from "../components/Categories";
import Footer from "../components/Footer";

import { toast } from 'react-toastify';

import classHandle from '../constans/Api/classes';

const Index = props => {
  const { data } = props;
  data?.status === 'success' ? toast.success(data?.message) : toast.error(data?.message);
  // console.log(data.data.data);
  return (
    <>
      <Head>
        <title>
          Belajar Coding dan Desain Dengan Mentor Yang Berpengalaman | Kang
          Koding
        </title>
        <link rel="shortcut icon" href={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.png`} type="image/x-icon" />
        <meta
          name="description"
          content="Kang Koding Adalah Sebuah Platform Bembelajaran Pemrograman Online"
        />
        <meta
          name="keywords"
          content="Kang Koding, belajar Online, VueJs, Vue, Vue Js, React, Reactjs, React Js, ReactNative, React Native, Express, APIs"
        />
      </Head>

      <div className="header-clip">
        <div className="absolute left-0 bottom-8 xs:bottom-9">
          <Image src="/images/circle.svg" width={300} height={300} alt={'sfdfd'} />
        </div>
        <div className="sunshine" />
        <div className="container mx-auto px-4">
          <Navbar />
          <Hero />
        </div>
      </div>

      <main>
        <Clients />
        <Courses data={data?.data?.data} />
        <Categories />
      </main>

     <Footer />
    </>
  );
};


export async function getStaticProps() {
  try {
    const data = await classHandle.all();
    return {
      props: { 
        data 
      },
    };
  } catch (err) {
    return err;
  }
}

export default Index;
