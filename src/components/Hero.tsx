// components/Hero.tsx
export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Bakgrunnsbilde*/}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bilde1.jpg')" }}
      />

      {/* Mørk overlay */}
      <div className="absolute inset-0 bg-black opacity-80" />

      {/* Tekst */}
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tighter drop-shadow-black drop-shadow-xl">
          NODE
        </h1>
        <p className="text-xl md:text-3xl lg:text-4xl font-medium text-gray-200 drop-shadow-black drop-shadow-xl">
          Linjeforeningen for Kunstig Intelligens ved UiB
        </p>
      </div>
    </section>
  );
}