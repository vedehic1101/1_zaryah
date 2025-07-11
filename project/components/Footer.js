import Link from 'next/link';
import { Heart, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Shop: [
      { name: 'All Products', href: '/shop' },
      { name: 'For Her', href: '/shop?category=for-her' },
      { name: 'For Him', href: '/shop?category=for-him' },
      { name: 'For Kids', href: '/shop?category=for-kids' },
      { name: 'Home & Living', href: '/shop?category=home' },
      { name: 'Occasions', href: '/shop?category=occasions' },
    ],
    Services: [
      { name: 'Gift Suggester', href: '/gift-suggester' },
      { name: 'Hamper Builder', href: '/hamper-builder' },
      { name: 'Express Delivery', href: '/delivery' },
      { name: 'Gift Wrapping', href: '/gift-wrapping' },
      { name: 'Bulk Orders', href: '/bulk-orders' },
    ],
    Support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Track Order', href: '/track-order' },
      { name: 'Returns', href: '/returns' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Size Guide', href: '/size-guide' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Artisan Stories', href: '/stories' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Become a Seller', href: '/become-seller' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">Zaryah</span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Where stories meet soul. Discover meaningful creations from passionate artisans 
              who pour their heart into every piece.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-6">{title}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Zaryah. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;