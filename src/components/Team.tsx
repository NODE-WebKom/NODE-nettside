import Link from 'next/link';
import Image from 'next/image';

export default function Team() {
  return (
    <section className="bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300 py-16">
        <div className="px-4 mx-auto max-w-7xl lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-700 dark:text-gray-300">Styret</h2>
            </div> 
            <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                {/* Daniel */}
                <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className="sm:w-48 shrink-0">
                        <img className="w-full h-48 object-cover rounded-lg sm:rounded-none sm:rounded-l-lg" src="/daniel.jpg" alt="Daniel Rasmussen" />
                    </a>
                    <div className="p-5">
                        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Daniel Rasmussen</h3>
                        <span className="text-gray-500 dark:text-gray-400">Styreleder</span>
                        <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">The big boss.</p>
                    </div>
                </div>
                {/* William */} 
                <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className="sm:w-48 shrink-0">
                        <img className="w-full h-48 object-cover rounded-lg sm:rounded-none sm:rounded-l-lg" src="william.jpg" alt="William Valentin" />
                    </a>
                    <div className="p-5">
                        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">William Valentin</h3>
                        <span className="text-gray-500 dark:text-gray-400">Nestleder</span>
                        <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Daniels barnevakt.</p>
                    </div>
                </div>
                {/* Magnus */} 
                <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className="sm:w-48 shrink-0">
                        <img className="w-full h-48 object-cover rounded-lg sm:rounded-none sm:rounded-l-lg" src="magnus.jpg" alt="Magnus Paulsen" />
                    </a>
                    <div className="p-5">
                        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Magnus Paulsen</h3>
                        <span className="text-gray-500 dark:text-gray-400">Leder av prosjektgruppen</span>
                        <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Fikser workshops.</p>
                    </div>
                </div>
                {/* Linnea */} 
                <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className="sm:w-48 shrink-0">
                        <img className="w-full h-48 object-cover rounded-lg sm:rounded-none sm:rounded-l-lg" src="linnea.jpg" alt="Linnea Hellevik" />
                    </a>
                    <div className="p-5">
                        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Linnea Hellevik</h3>
                        <span className="text-gray-500 dark:text-gray-400">Leder av bedriftskomiteen</span>
                        <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Fikser bedriftspresentasjoner.</p>
                    </div>
                </div>
                {/* Viktor */} 
                <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className="sm:w-48 shrink-0">
                        <img className="w-full h-48 object-cover rounded-lg sm:rounded-none sm:rounded-l-lg" src="viktor.jpg" alt="Viktor Oltedal" />
                    </a>
                    <div className="p-5">
                        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Viktor Oltedal</h3>
                        <span className="text-gray-500 dark:text-gray-400">Leder av sosialkomiteen</span>
                        <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Fikser fester.</p>
                    </div>
                </div>
                {/* Ingeborg */} 
                <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className="sm:w-48 shrink-0">
                        <img className="w-full h-48 object-cover rounded-lg sm:rounded-none sm:rounded-l-lg" src="ingeborg.jpg" alt="Ingeborg Aarbø" />
                    </a>
                    <div className="p-5">
                        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Ingeborg Aarbø</h3>
                        <span className="text-gray-500 dark:text-gray-400">Økonomi-ansvarlig</span>
                        <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Fikser cash.</p>
                    </div>
                </div>
                {/* Olav */} 
                <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className="sm:w-48 shrink-0">
                        <img className="w-full h-48 object-cover rounded-lg sm:rounded-none sm:rounded-l-lg" src="olav.jpg" alt="Olav Tehel" />
                    </a>
                    <div className="p-5">
                        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Olav Tehel</h3>
                        <span className="text-gray-500 dark:text-gray-400">Fag-ansvarlig</span>
                        <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Bugges barnevakt.</p>
                    </div>
                </div>
                {/* Marcus */} 
                <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className="sm:w-48 shrink-0">
                        <img className="w-full h-48 object-cover rounded-lg sm:rounded-none sm:rounded-l-lg" src="marcus.jpg" alt="Marcus Kvitne" />
                    </a>
                    <div className="p-5">
                        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Marcus Kvitne</h3>
                        <span className="text-gray-500 dark:text-gray-400">PR-ansvarlig</span>
                        <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Knipser.</p>
                    </div>
                </div>
            </div>  
        </div>
    </section>
  );
}