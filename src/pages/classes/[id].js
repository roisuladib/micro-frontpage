/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import YouTube from 'react-youtube';
import { CSSTransition } from 'react-transition-group';
import NumberFormat from '/src/helpers/NumberFormat';
import Navbar from '../../components/Navbar';
import Student from '/public/images/ic_student.svg';
import Video from '/public/images/ic_video.svg';
import Certificate from '/public/images/ic_certificate.svg';

import apiClasses from '../../constans/Api/classes';
import Features from '../../components/Detail/Features';
import PreviewVideo from '../../components/Detail/PreviewVideo';
import Footer from '../../components/Footer';
import CoursePhotos from '../../components/Detail/CoursePhotos';
import HappyStudent from '../../components/Detail/HappyStudent';

const ClassDetail = ({ data }) => {
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

      {/* Header */}
      <header className="relative overflow-hidden h-[660px]">
        {
          data?.chapters[0]?.lessons[0]?.video 
          && <div className="youtube-wrapper">
            <YouTube 
              videoId={data?.chapters[0]?.lessons?.[0]?.video} 
              id={data?.chapters[0]?.lessons[0]?.video} 
              opts={{ 
                playerVars: {
                  loop: 1,
                  autoplay: 0,
                  controls: 0,
                  showInfo: 0,
                  mute: 1
                }
               }} 
               onEnd={e => {
                 e.target.playVideo();
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

        {/* Navbar */}
        <section className="container mx-auto px-4 z-10 relative">
          <Navbar />
        </section>
      </header>


      <section className="container mx-auto px-4 pt-24 relative z-10">

        {/* Fitur */}
        <div className="absolute inset-x-0 top-0 w-full transform -translate-y-1/2">
          <div className="w-full lg:w-3/4 mx-auto">
            <div className="flex flex-col md:flex-row justify-center md:justify-between">
              <Features data={{ 
                icon: <Student /> ,
                title: 'STUDENT',
                val: data?.total_students
              }} />
              <Features data={{ 
                icon: <Video /> ,
                title: 'VIDEO',
                val: data?.total_videos
              }} />
              <Features data={{ 
                icon: <Certificate /> ,
                title: 'CERTIFICATE',
                val: data?.certificate === 1 ? 'TERSEDIA' : '-'
              }} />
            </div>
          </div>
        </div>

        {/* Checkout */}
        <div>
            <CSSTransition in={inSticky} timeout={300} classNames="checkout-meta" unmountOnExit>
              <div className="checkout-meta w-full bg-white z-50 left-0 py-3">
                <div className="w-full md:w-3/4 px-4 md:px-0 mx-auto">
                  <div className="flex items-center justify-between">
                    <div className="w-full hidden sm:block">
                      <h2 className="c-4 font-normal text-base">Nama Kelas</h2>
                      <h3 className="c-5 font-normal text-2xl">{data?.name ?? 'Nama Kelas'}</h3>
                    </div>
                    <h5 className="text-xl font-semibold c-3 whitespace-nowrap mr-4">
                      {
                        data?.type === 'free' 
                        ? 'FREE' 
                        : <span>Rp {NumberFormat(data?.price ?? 0)}</span>
                      }
                    </h5>
                    <a href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/joined/${data?.id}`} target="_blank" className="text-white b-3 rounded-xl hover:bg-[#e96818] focus:outline-none shadow-inner px-6 py-2 whitespace-nowrap transition-all duration-300 " rel="noopener noreferrer">
                      {
                        data?.type === 'free' 
                        ? 'ENROLL NOW' 
                        : 'CHECKOUT'
                      }
                    </a>
                  </div>
                </div>
              </div>
            </CSSTransition>
        </div>

        <div className="w-full -mx-3">
          <div className="w-3/4 mx-auto mt-14">
            <div className="w-4/5">

              {/* Description */}
              <section>
                <h6 className="font-medium text-2xl c-5 mb-3">
                  About <span className="c-3">Course</span>
                </h6>
                <p className="font-light text-lg c-4 leading-[30px] mb-3">
                  { data?.description ?? 'Description...' }
                </p>
              </section>

              {/* Course Photo */}
              <section className="mt-10">
                <h6 className="font-medium text-2xl c-5 mb-3">
                  Photos <span className="c-3">Course</span>
                </h6>
                <div className="flex justify-start items-center -mx-4 mt-6">
                  {
                    data?.images?.length > 0 
                    ? data?.images?.map(photo => <CoursePhotos key={ photo.id } data={ photo.image } />) 
                    : <div className="w-full text-center py-12">Image Not Found</div>
                  }
                </div>
              </section>

              {/* Preview Chapter */}
              <section className="mt-10">
                <h6 className="font-medium text-2xl c-5 mb-3">
                  You Will <span className="c-3">Learn</span>
                </h6>
                {
                  data?.chapters?.length > 0 
                  ? <PreviewVideo previews={ data?.chapters } /> 
                  : <div className="text-center w-full py-12">Preview Not Found</div>
                }
              </section>

              {/* Mentor */}
              <section className="mt-10 w-2/3">
                <h6 className="font-medium text-2xl c-5 mb-3">
                  Our <span className="c-3">Mentor</span>
                </h6>
                <div className="flex items-center">
                  <img className="w-20 h-20 rounded-full overflow-hidden object-cover cursor-pointer" 
                    src={data?.mentors?.profile ?? '/images/ic-avatar.svg'} 
                    alt={data?.mentors?.name ?? 'Mentor'} 
                    title={data?.mentors?.name ?? 'Mentor'}
                  />
                  <div className="ml-4">
                    <h2 className="text-lg c-5">
                      { data?.mentors?.name ?? 'Nama Mentor' }
                    </h2>
                    <p className="font-light text-sm c-4 mt-[2px]">
                      { data?.mentors?.profession ?? 'Prefossion' }
                    </p>
                  </div>
                </div>
              </section>

              {/* Review */}
              <section className="mt-10 w-1/2">
                <h6 className="font-medium text-2xl c-5 mb-3">
                  Happy <span className="c-3">Students</span>
                </h6>
                {
                  data?.reviews?.length > 0 
                  && data?.reviews?.map(rev => <HappyStudent key={rev.id} data={rev} />) 
                }
              </section>

            </div>
          </div>
        </div>

      </section>

      <section ref={footer}>
        <Footer />
      </section>
    </>
  );
};

ClassDetail.getInitialProps = async props => {
  const { id } = props.query;
  try {
    const data = await apiClasses.detail(id);
    return {data: data};
  } catch (error) {
    return error;
  }
};

export default ClassDetail;
