import Navbar from '@/app/(main)/_components/Navbar';
import Editor from '@/app/(main)/_components/editor';
import Footer from '@/app/(main)/_components/Footer';


export default async function Home() {
  return (<>
  <Navbar />
  <div className='m-3 mt-10 flex flex-col items-center'>
    <Editor />
    </div>
    <Footer />
  </>
  )
}
