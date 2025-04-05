import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Tennis Score Tracker',
  description: 'Track tennis scores easily'
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="text-blue-500">Tennis Score Tracker</span>
          </h1>
          <p className="mt-3 text-xl text-gray-600 sm:mt-5 sm:text-2xl">
            Effortlessly track and manage tennis scores with our intuitive app.
          </p>
          <div className="mt-8 sm:mt-10 sm:flex sm:justify-center">
            <div className="rounded-md shadow">
              <Link href="/matches" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10">
                Get Started
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link href="https://sovari.co.za" className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
