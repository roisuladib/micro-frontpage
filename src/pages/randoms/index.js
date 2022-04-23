import Head from 'next/head';
import Link from 'next/link';

const Random = ({data}) => {
   // console.log(props);
  return (     
    <div className='container mx-auto px-3'>
      <Head>
        <title>Random App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
           <div>
              <h1 className='bg-green-500 text-white text-4xl'>Coba Call API</h1>
              <ul>
              {
                 data.map(todo => {
                     return <li className='border border-pink-500 py-5 px-5' key={todo.id}>{todo?.title ?? ""}<Link href='randoms/[id]' as={`/randoms/${todo.id }`}><a className='bg-violet-500 px-6 py-3 hover:bg-violet-600 rounded-md text-white'>Launch</a></Link></li>
                 })
              }
              </ul>
           </div>
      </main>
    </div>
  );
};

Random.getInitialProps = async () => {
   try {
      const data = await fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => json)
      return {data};
   } catch (error) {
       
   }
}

export default Random;