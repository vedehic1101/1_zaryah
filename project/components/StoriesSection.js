import Link from 'next/link';

const StoriesSection = () => {
  const stories = [
    {
      title: "The Ceramic Artist's Journey",
      description: "Meet Priya, who creates stunning pottery pieces in her Mumbai studio",
      image: "https://images.pexels.com/photos/6195097/pexels-photo-6195097.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      href: "/stories/ceramic-artist"
    },
    {
      title: "Handwoven Dreams",
      description: "Discover the art of traditional weaving passed down through generations",
      image: "https://images.pexels.com/photos/6195098/pexels-photo-6195098.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      href: "/stories/handwoven-dreams"
    },
    {
      title: "Crafting Memories",
      description: "How personalized gifts create lasting connections between loved ones",
      image: "https://images.pexels.com/photos/6195129/pexels-photo-6195129.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      href: "/stories/crafting-memories"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Stories That Inspire
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <Link
              key={index}
              href={story.href}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-[4/3] relative">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                <p className="text-sm opacity-90">{story.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;