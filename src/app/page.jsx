import Link from 'next/link';
import Image from 'next/image';
import imageAsset1 from '/public/1.png'
import imageAsset2 from '/public/2.png'
import imageAsset3 from '/public/3.png'
import imageAsset4 from '/public/4.png'
import imageAsset5 from '/public/5.png'
import imageAsset6 from '/public/6.png'

export const metadata = {
  title: 'Tennis Score Tracker',
  description: 'Track tennis scores easily'
}

export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center justify-center min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="text-blue-500">Tennis Score Tracker</span>
          </h1>
          <p className="mt-3 text-xl text-gray-600 sm:mt-5 sm:text-2xl">
            Effortlessly track and manage tennis scores with our intuitive app.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
          <div className="rounded-md shadow">
              <Link href="/matches" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10">
                  Get Started
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-3xl mx-auto text-center">
          {/* <h2 className="text-2xl font-semibold text-gray-800">
            Key Features
          </h2> */}
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
            <Image src={imageAsset1} width={250} height={400} alt='tsa'/>
            <Image className='mt-5' src={imageAsset2} width={200} height={300} alt='tsa'/>
            <Image src={imageAsset4} width={125} height={300} alt='tsa'/>
            <Image src={imageAsset3} width={200} height={300} alt='tsa'/>
            <Image src={imageAsset5} width={200} height={300} alt='tsa'/>
            <Image src={imageAsset6} width={200} height={300} alt='tsa'/>
            {/* Add more feature cards */}
          </div>
        </div>
      </main>
    </div>
  );
}