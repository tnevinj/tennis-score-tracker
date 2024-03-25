import Link from 'next/link';
import Image from 'next/image';
import imageAsset from '@/app/tsa-amex.png'

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
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center">
              <svg
                className="h-12 w-12 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-semibold text-gray-800">
                Live Score Updates
              </h3>
              <p className="mt-1 text-gray-600">
                Get real-time updates on match scores as they happen.
              </p>
            </div>
            <Image src={imageAsset} width={2400} height={1500} alt='tsa-amex'/>
            {/* Add more feature cards */}
          </div>
        </div>
      </main>
    </div>
  );
}