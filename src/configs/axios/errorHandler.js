import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const errorHandler = (error) => {
   if (error) {
      let message;
      if (error.response) {
         console.log(error);
         if (error.response.status === 500) message = 'Something went terribly wrong';
         else message = (error.response.data.message);

         if (typeof message === 'string') toast.error(message);

         return Promise.reject(error);
      }
   }
};

export default errorHandler;