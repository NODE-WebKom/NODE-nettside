import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo + tagline FIKS SENTRERING*/}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="mb-4">
              <Image 
                src="/nevralenils.png" 
                alt="NODE Logo" 
                width={286} 
                height={240} 
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm max-w-xs text-center md:text-left">
              Linjeforeningen for Kunstig Intelligens ved Universitetet i Bergen
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-4">NAVIGASJON</h3>
            <div className="space-y-2">
              <Link href="/" className="block hover:text-cyan-900 transition">
                HJEM
              </Link>
              <Link href="/om-oss" className="block hover:text-cyan-900 transition">
                OM
              </Link>
              <Link href="/arrangementer" className="block hover:text-cyan-900 transition">
                ARRANGEMENTER
              </Link>
              <a href="https://node.myspreadshop.no/all" target="_blank" rel="noopener noreferrer" className="block hover:text-cyan-900 transition">
                MERCH
              </a>
            </div>
          </div>

          {/* Kontakt */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-4">KONTAKT</h3>
            <div className="space-y-3">
              <a href="mailto:node@uib.no" className="hover:text-blue-400 transition flex items-center gap-2">
                <span>✉</span> node@uib.no
              </a>
              <div className="flex gap-4 mt-4">
                <a href="https://instagram.com/node.uib" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                  Instagram
                </a>
                <a href="https://www.facebook.com/groups/602424971523361/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                  Facebook
                </a>
                <a href="https://touchgrass.now/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                  Discord
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bunnlinje */}
        <div className="mt-10 pt-8 border-t border-gray-800 text-center text-sm">
          <p>© {new Date().getFullYear()} NODE – Linjeforeningen for Kunstig Intelligens ved Universitetet i Bergen</p>
        </div>
      </div>
    </footer>
  );
}