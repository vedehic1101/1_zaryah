import Link from 'next/link';

const CategorySection = () => {
  const categories = [
    {
      name: 'For Her',
      image: 'https://images.pexels.com/photos/6195097/pexels-photo-6195097.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      href: '/shop?category=for-her'
    },
    {
      name: 'For Him',
      image: 'https://images.pexels.com/photos/6195098/pexels-photo-6195098.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      href: '/shop?category=for-him'
    },
    {
      name: 'For Kids',
      image: 'https://images.pexels.com/photos/6195129/pexels-photo-6195129.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      href: '/shop?category=for-kids'
    },
    {
      name: 'Home',
      image: 'https://images.pexels.com/photos/6195130/pexels-photo-6195130.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      href: '/shop?category=home'
    },
    {
      name: 'Occasions',
      image: 'https://images.pexels.com/photos/6195131/pexels-photo-6195131.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      href: '/shop?category=occasions'
    },
    {
      name: 'Personalised',
      image: 'https://images.pexels.com/photos/6195132/pexels-photo-6195132.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      href: '/shop?category=personalised'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-square relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white font-semibold text-lg text-center">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;