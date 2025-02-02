export default function Hero() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-accent-coral to-red-800 px-6 md:px-12">
      <div className="w-full max-w-4xl text-center flex flex-col gap-6 md:gap-8 mt-16 md:mt-24">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight md:leading-snug">
          Gerencie suas Mercadorias com Facilidade!
        </h1>
        <h2 className="text-lg md:text-2xl text-gray-100 mb-8">
          Gerenciar suas mercadorias nunca foi tão fácil!
          <br className="hidden md:block" />
          Acesse o sistema e tenha mais agilidade no seu dia a dia.
        </h2>
      </div>
    </div>
  );
}
