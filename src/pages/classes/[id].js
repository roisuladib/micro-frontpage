import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import YouTube from 'react-youtube';
import { CSSTransition } from 'react-transition-group';
import NumberFormat from '/src/helpers/NumberFormat';
import Navbar from '../../components/Navbar';
import Student from '/public/images/ic_student.svg';
import Video from '/public/images/ic_video.svg';
import Certificate from '/public/images/ic_certificate.svg';

import classHandle from '../../constans/Api/classes';
import Features from '../../components/Detail/Features';
import Footer from '../../components/Footer';
import CoursePhotos from '../../components/Detail/CoursePhotos';

const ClassDetail = ({ data }) => {
  console.log(data);
  const [inSticky, setInSticky] = useState(false);
  const footer = useRef(null);
  useEffect(() => {
    const stickyOffsetTop = footer.current.getBoundingClientRect().top;
    const stickyMetaToggle = () => setInSticky(stickyOffsetTop >= window.pageYOffset + window.innerHeight);
    window.addEventListener('scroll', stickyMetaToggle), () => window.removeEventListener('scroll', stickyMetaToggle);
  }, [])
  return (     
    <>
      <Head>
        <title>Micro | Detail Kelas {data?.name ?? 'Mas Adib'}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <section className="relative overflow-hidden h-[660px]">
        {
          data?.chapter?.[0]?.lesson?.[0]?.video && 
          <div className="youtube-wrapper">
            <YouTube 
              videoId={data?.chapter?.[0]?.lesson?.[0]?.video} 
              id={data?.chapter?.[0]?.lesson?.[0]?.video} 
              opts={{ 
                playerVars: {
                  loop: 1,
                  autoplay: 0,
                  controls: 0,
                  showInfo: 0,
                  mute: 1
                }
               }} 
               onEnd={(event) => {
                 event.target.playVideo()
               }}
            />
          </div>
        }
        <div className="absolute inset-0 z-0 w-full h-full bg-black opacity-70" />
        <div className="meta-title absolute inset-0 z-0 w-full object-fill flex justify-center items-center">
          <div className="text-center">
            <h3 className="font-normal text-[22px] mb-3 text-white">
              Kelas Online:
            </h3>
            <h1 className="font-semibold text-6xl c-3">
              {data?.name ?? 'Nama Kelas'}
            </h1>
          </div>
        </div>
        <div className="container mx-auto px-4 z-10 relative">
          <Navbar />
        </div>
      </section>

      <section className="container mx-auto px-4 pt-24 relative z-10">
        <div className="absolute inset-x-0 top-0 w-full transform -translate-y-1/2">
          <div className="w-full lg:w-3/4 mx-auto">
            <div className="flex flex-col md:flex-row justify-center md:justify-between">
              <Features data={{ 
                icon: <Student /> ,
                title: 'STUDENT',
                val: data?.total_student
              }} />
              <Features data={{ 
                icon: <Video /> ,
                title: 'VIDEO',
                val: data?.total_video
              }} />
              <Features data={{ 
                icon: <Certificate /> ,
                title: 'CERTIFICATE',
                val: data?.certificate === 1 ? 'TERSEDIA' : '-'
              }} />
            </div>
          </div>
        </div>

        <div>
            <CSSTransition in={inSticky} timeout={300} classNames="checkout-meta" unmountOnExit>
              <div className="checkout-meta w-full bg-white z-50 left-0 py-3">
                <div className="w-full md:w-3/4 px-4 md:px-0 mx-auto">
                  <div className="flex items-center">
                    <div className="w-full">
                      <h2 className="c-4 font-normal text-base">Nama Kelas</h2>
                      <h3 className="c-5 font-normal text-2xl">{data?.name ?? 'Nama Kelas'}</h3>
                    </div>
                    <h5 className="text-xl font-semibold c-3 whitespace-nowrap mr-4">{data?.type === 'free' ? 'FREE' : <span>Rp {NumberFormat(data?.price ?? 0)}</span>}</h5>
                    <a href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/joined/${data?.id}`} target="_blank" className="text-white b-3 rounded-xl hover:bg-[#e96818] focus:outline-none shadow-inner px-6 py-2 whitespace-nowrap transition-all duration-300 " rel="noopener noreferrer">
                      {data?.type === 'free' ? 'ENROLL NOW' : 'CHECKOUT'}
                    </a>
                  </div>
                </div>
              </div>
            </CSSTransition>
        </div>

        <div className="w-3/4 mx-auto mt-14" id="desc">
          <div className="w-4/5">
            <section>
              <h6 className="font-medium text-2xl c-5 mb-3">About <span className="c-3">Course</span></h6>
              <p className="font-light text-lg c-4 leading-[30px] mb-3">
                {data?.description ?? 'Description...'}
              </p>
            </section>

            <section>
              <h6 className="font-medium text-2xl c-5 mb-3">Photos <span className="c-3">Course</span></h6>
              <div className="flex">
                
              </div>
            </section>

          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 relative z-0" id="content">
        {/* <section className="w-3/4 mx-auto mt-14" id="desc">
          <div className="w-4/5">
            <div>
              <h6 className="font-medium text-2xl c-5 mb-3">About <span className="c-3">Course</span></h6>
              <p className="font-light text-lg c-4 leading-[30px] mb-3">
                {data?.description ?? 'Description...'}
              </p>
            </div>
          </div>
        </section> */}
        <section className="w-3/4 mx-auto mt-14" id="photo">
          {/* <div>
            <h6 className="font-medium text-2xl c-5 mb-3">Photos <span className="c-3">Course</span></h6>
          </div>
          <div className="flex justify-start items-center -mx-4 mt-6">
            {
              data?.image?.length > 0 ?
              data?.image?.map((photo, index) => <CoursePhotos data={photo.image} key={index} />) :
              <div className="w-full text-center py-12">Image not found</div>
            }
          </div> */}
        </section>
      </main>

      <div className="h-[1000px]"></div>
      <section ref={footer}>
        <Footer />
      </section>
    </>
  );
};

ClassDetail.getInitialProps = async props => {
  const { id } = props.query;
  try {
    const data = await classHandle.detail(id);
    return {data: data.data};
  } catch (err) {
    return err;
  }
};

export default ClassDetail;
