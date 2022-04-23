import { useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import {useRouter} from 'next/router';
import Head from "next/head";

const Custom404 = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, [router]);
  return (
    <>
      <Head>
         <title>404 Page Not Found</title>
      </Head>

      <main className="h-screen w-full flex flex-col justify-center items-center">
         <div className="mb-12">
            <Image src="/images/404.svg" width={600} height={400} alt="ekke" />
         </div>
        <div className="bg-[#FE721C] text-white px-2 text-sm rounded-md rotate-12 absolute mb-36">
          Page Not Found
        </div>
        <button className="mb-64">
          <Link href="/">
            <a className="text-lg font-medium text-white bg-[#FF6A3D] px-6 py-2 rounded-2xl group active:text-orange-500 focus:outline-none focus:ring">
              Home
            </a>
          </Link>
        </button>
      </main>
    </>
  );
};

export default Custom404;
