import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 z-10">
      {/* Sponsors Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-xl font-semibold text-center text-gray-500 mb-4">Our Sponsors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-items-center">
          <div className="hover:opacity-80 transition-opacity bg-white p-3 rounded-lg shadow-sm h-16 flex items-center justify-center">
            <div className="relative w-[120px] h-[40px]">
              <Image 
                src="/sponsors/tsa.png" 
                alt="TSA" 
                fill={true}
                sizes="120px"
                className="object-contain"
              />
            </div>
          </div>
          <div className="hover:opacity-80 transition-opacity bg-white p-3 rounded-lg shadow-sm h-16 flex items-center justify-center">
            <div className="relative w-[120px] h-[40px]">
              <Image 
                src="/sponsors/amex.png" 
                alt="American Express" 
                fill={true}
                sizes="120px"
                className="object-contain"
              />
            </div>
          </div>
          <div className="hover:opacity-80 transition-opacity bg-gray-800 p-3 rounded-lg shadow-sm h-16 flex items-center justify-center">
            <div className="relative w-[120px] h-[40px]">
              <Image 
                src="/sponsors/renault.png" 
                alt="Renault" 
                fill={true}
                sizes="120px"
                className="object-contain"
              />
            </div>
          </div>
          <div className="hover:opacity-80 transition-opacity bg-white p-3 rounded-lg shadow-sm h-16 flex items-center justify-center">
            <div className="relative w-[120px] h-[40px]">
              <Image 
                src="/sponsors/dunlop.jpg" 
                alt="Dunlop" 
                fill={true}
                sizes="120px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-4 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SOVARI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
