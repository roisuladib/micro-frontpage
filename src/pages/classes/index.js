import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ListCourses from "../../components/Courses";

import apiClasses from '../../constans/Api/classes';
import Courses from '../../components/Courses';

export default function Clasess({ data }) {
   const [search, setSearch] = useState('');
   const [searchFocus, setSearchFocus] = useState(false);
   const [searchResponse, setSearchResponse] = useState(() => ({ isLoading: false, isError: false, data: [] }))
   const selectWrapper = useRef(null);

   const handleOutside = e => {
      if (selectWrapper && !selectWrapper.current.contains(e.target)) setSearch('');
   }

   let timeoutSearch = useRef(null);
   const handleSearch = e => {
      e.persist();
      setSearch(e.target.value);
      clearTimeout(timeoutSearch.current);
      timeoutSearch.current = setTimeout(() => {
         setSearchResponse({
            isLoading: true, isError: false, data: null
         })
         apiClasses.all({ params: { q: e.target.value } })
         .then(res => {
            setSearchResponse({
               isLoading: false, isError: false, data: res.data
            });
         })
         .catch(err => {
            setSearchResponse({
               isLoading: false, isError: true, data: null
            })
         })
      }, 1000);
   }

   useEffect(() => {
      window.addEventListener('mousedown', handleOutside);
      return () => window.removeEventListener('mousedown', handleOutside);
   }, [])

   // console.log(data);
   return (
      <>
         <Head>
            <title>Micro | All Class</title>
            <meta name="description" content="Semua Kelas" />
         </Head>

         <section className="relative h-[360px] z-30 mb-20">
            <div className="absolute inset-0 z-0 w-full h-full bg-black opacity-75">
               <div className="page-course-meta absolute bottom-0 object-fill z-0 w-full flex justify-center items-center -mb-[25px]">
                  <div className="">
                     <h2 className="text-6xl c-3 font-semibold text-center mb-10">Libraries</h2>
                     <h4 className="text-white font-light text-lg text-center">
                     Jangan mau kalah kejar impian anda <br />Yuk ikuti perkembangan teknologi
                     </h4> 
                     <div ref={selectWrapper} className="relative flex flex-col">
                        <input 
                           onChange={handleSearch} 
                           onFocus={() => setSearchFocus(!searchFocus)}
                           onBlur={() => setSearchFocus(!searchFocus)}
                           value={search}
                           placeholder={searchFocus ? 'Ketik min 3 huruf untuk mencari...' : 'Mau belajar apa?'}
                           id="q" type="search" 
                           className="w-full md:w-96 mt-6 rounded-xl bg-white border border-gray-500 transition-all duration-300 focus:outline-none focus:border-teal-500 py-3 px-5"
                        />
                        {                        
                           search.length > 2 && <div className="absolute flex flex-col px-4 py-2 bg-white border border-gray-600 w-full top-[75px]">
                              {
                                 searchResponse.isLoading ? 'Loading...' :
                                 <>
                                    { searchResponse.isError && 'Something is Technical wrong' }
                                    {
                                       searchResponse?.data?.length > 0 ?
                                       searchResponse?.data?.map?.(course =>
                                          <div key={course.id} className="relative flex items-center -mx-4 py-2 cursor-pointer hover:bg-gray-200">
                                             <div className="w-auto px-4" style={{ width: 150 }}>
                                                <img src={course.thumbnail ?? '/images/ic-avatar.svg'} alt={course.name} title={course.name} />
                                             </div>
                                             <div className="w-full px-4">
                                                <h6 className="text-gray-800 text-lg">{course.name}</h6>
                                                <p className="text-sm font-light text-gray-600">{course.level}</p>
                                                <Link href="/classes/[id]" as={`/classes/${course.id}`}><a className="link-wrapper"></a></Link>
                                             </div>
                                          </div>) : 'Course Not Found'
                                    }
                                 </>
                              }
                           </div>
                        }
                     </div>
                  </div>
               </div>
            </div>

            <div className="container mx-auto px-4 z-10 relative">
               <Navbar />
            </div>
         </section>

         <main>
            <section className="container mx-auto px-4">
               <Courses data={data} titleL="Search Classes" subTitleLL="Let's" subTitleLR="Learn" titleR="" />
            </section>
         </main>

         <section>
            <Footer />
         </section>

      </>
   );
}

Clasess.getInitialProps = async () => {
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
//    try {
//       const data = await apiClasses.all();
//       return { props: {data} }
//    } catch (error) {
//       return error;
//    }
// }