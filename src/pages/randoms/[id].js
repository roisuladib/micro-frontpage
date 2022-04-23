import Head from 'next/head';
import Link from 'next/link';

const Todo = ({data}) => {
   // console.log(data);
  return (     
    <div className='container mx-auto px-3'>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
           <div>
              <h1 className='bg-green-500 text-white text-4xl'>{data.title}</h1>   
              <Link href='/randoms'><a className='bg-violet-500 px-6 py-3 hover:bg-violet-600 rounded-md text-white'>Back</a></Link>           
           </div>
      </main>
    </div>
  );
};

Todo.getInitialProps = async (props) => {
   // console.log(props.query);
   const {id} = props.query;
   try {
      const data = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
         .then(response => response.json())
         .then(json => json)
      return {data};
   } catch (error) {
       
   }
}

export default Todo;