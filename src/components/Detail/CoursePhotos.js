import Preview from '/public/images/ic_view.svg';
import Modal from '/src/components/Modal';

const CoursePhotos = ({ data }) => {
   return (
      <div className="w-1/3 px-4">
         <div className="courses-card relative">
            <div className="thumb-card overflow-hidden">
               <figure>
                  <Preview />
                  <img src={data} alt={data} className="object-cover h-[170px] w-full rounded-xl" />
               </figure>
               <Modal content={(toggle) => <img src={data} alt={data} />}>
                  {
                     toggle => <span onClick={toggle} className="link-wrapper"></span>
                  }
               </Modal>
            </div>
         </div>
      </div>
   );
}

export default CoursePhotos;