import Preview from '/public/images/btn_view.svg';
import Modal from '/src/components/Modal';

const CoursePhotos = ({ data }) => {
   return (
      <div className="w-1/3 px-4">
         <div className="item relative">
            <div className="item-image">
               <figure>
                  <Preview />
                  <img src={data} alt={data} className="object-cover h-32 w-full" />
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