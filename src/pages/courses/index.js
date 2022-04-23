import Link from 'next/link';
import { toast } from 'react-toastify';

const Courses = () => {
   return (
      <>
      <header className="container max-h-max px-4">
        <nav className="flex py-2 justify-start items-center">
          <Link href="/"><a className="bg-purple-600 text-white px-7 py-2 rounded-xl hover:bg-purple-500 focus:border focus:border-lime-400 mx-2">Home</a></Link>
          <Link href="/class"><a className="bg-purple-600 text-white px-7 py-2 rounded-xl hover:bg-purple-500 focus:border focus:border-lime-400 mx-2">Class</a></Link>
        </nav>
      </header>
      <div>
         <h1>Class</h1>
         <div>
            <button onClick={() => toast.success('Mas Adib')}>Notify !</button>
         </div>
      </div>
      </>
   );
}

export default Courses;