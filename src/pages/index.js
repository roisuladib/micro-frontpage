import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Clients from "../components/Clients";
import Courses from "../components/Courses";
import Categories from "../components/Categories";
import Footer from "../components/Footer";

import { toast } from 'react-toastify';

import apiClasses from '../constans/Api/classes';

export default function Index(props) {
  const { data } = props;
  // data?.status === 'success' ? toast.success(data?.message) : toast.error(data?.message);
  return (
    <>
      <Head>
        <title>
          Belajar Coding dan Desain Dengan Mentor Yang Berpengalaman | Kang
          Koding
        </title>
        <meta
          name="description"
          content="Kang Koding Adalah Sebuah Platform Bembelajaran Pemrograman Online"
        />
        <meta
          name="keywords"
          content="Kang Koding, belajar Online, VueJs, Vue, Vue Js, React, Reactjs, React Js, ReactNative, React Native, Express, APIs"
        />
      </Head>

      <header className="header-clip">
        <div className="absolute left-0 bottom-8 xs:bottom-9">
          <Image src="/images/circle.svg" width={300} height={300} alt={'sfdfd'} />
        </div>
        <div className="sunshine" />
        <div className="container mx-auto px-4">
          <Navbar />
          <Hero />
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-24" id="clients">
          <Clients />
        </section>

        <section className="container mx-auto px-4" id="new-class">
          <Courses data={data} titleL="New Classes" subTitleLL="Summer" subTitleLR="Productive" titleR="View All Classes" />
        </section>

        <section className="container mx-auto px-4 pt-[68px]" id="category-class">
          <Categories />
        </section>
      </main>

      <Footer />
    </>
  );
};

Index.getInitialProps = async () => {
  try {
    const data = await apiClasses.all();
    return {
      data : data?.data
    }
  } catch (error) {
    return error;
  }
}
// export async function getStaticProps() {
//   try {
//     const data = await apiClasses.all();
//     return {props:{data}};
//   } catch (error) {
//     return error;
//   }
// }
