import Image from "next/image"

export default function Home() {
    return(
        <main className="flex items-center justify-center h-screen">
            <div className="bg-gray-100 block max-w-sm border border-gray-900 rounded-2xl shadow-2xl">
                <div className="p-6 pb-0 text-center">
                    <a href="#">
                        <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">Nettsiden renoveres...</h5>
                    </a>
                    <img className="rounded-t-base" src="/nevralenils_bg_transparent.png" alt="" />
                </div>
            </div>
        </main>
    )
}