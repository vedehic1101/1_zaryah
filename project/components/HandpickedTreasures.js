import Link from 'next/link';

const HandpickedTreasures = () => {
  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-amber-100 px-4 py-2 rounded-full mb-6">
            <span className="text-amber-800 font-medium">📦 Curated Collections</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Handpicked <span className="text-amber-700">Treasures</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover meaningful creations from passionate artisans who pour their heart
            into every piece
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>Begin Your Journey</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HandpickedTreasures;