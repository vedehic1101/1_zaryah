const ZaryahWaySection = () => {
  const values = [
    {
      icon: "💖",
      title: "Crafted with Purpose",
      description: "Each piece carries the passion and dedication of skilled artisans who believe in creating something truly meaningful."
    },
    {
      icon: "🚀",
      title: "Swift Connections",
      description: "Bridge distances quickly with our express delivery service, bringing heartfelt gifts to your loved ones in hours."
    },
    {
      icon: "🌟",
      title: "Empower Dreams",
      description: "Every purchase directly supports independent artisans, helping them continue their creative journey and preserve traditional crafts."
    },
    {
      icon: "🏆",
      title: "Trusted Artisans",
      description: "Our carefully curated community of verified creators ensures authentic craftsmanship and genuine stories behind every piece."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-amber-200 px-4 py-2 rounded-full mb-6">
            <span className="text-amber-800 font-medium">⭐ The Zaryah Way</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Where <span className="text-amber-700">Stories</span> Meets <span className="text-amber-700">Soul</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Every piece in our collection carries the essence of its creator's journey,
            connecting hearts across distances through meaningful gifts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-center group hover:-translate-y-1"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-amber-600 text-white py-20 px-8 rounded-3xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Begin Your Journey?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Discover meaningful gifts that tell your story
            </p>
            <button className="bg-white text-amber-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZaryahWaySection;