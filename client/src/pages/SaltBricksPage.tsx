import React from 'react';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function SaltBricksPage() {
  // Application sections
  const applications = [
    {
      title: 'Home Décor',
      description: 'Incorporate Himalayan Salt Bricks and Tiles into your home design to create a unique and healthy living environment that purifies air and enhances visual appeal.',
      imageSrc: 'https://images.pexels.com/photos/7045679/pexels-photo-7045679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Wellness Spaces',
      description: 'Create a relaxing and rejuvenating atmosphere in spas, gyms, and yoga studios that helps reduce stress, enhance mood, and promote overall emotional well-being.',
      imageSrc: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Restaurants & Hospitality',
      description: 'Offer a distinctive and inviting ambiance in restaurants and commercial establishments that attracts customers with calming light and health benefits.',
      imageSrc: 'https://images.pexels.com/photos/7363743/pexels-photo-7363743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  // Product options
  const productOptions = [
    {
      title: 'Standard Bricks',
      description: 'Regular-sized salt bricks that are perfect for creating accent walls or entire room installations.',
      dimensions: '8" x 4" x 2"',
      price: 'Starting at $12.99 per brick'
    },
    {
      title: 'Large Tiles',
      description: 'Larger format salt tiles for covering larger areas with fewer pieces, creating a seamless look.',
      dimensions: '12" x 12" x 1"',
      price: 'Starting at $24.99 per tile'
    },
    {
      title: 'Mosaic Tiles',
      description: 'Smaller tiles that can be arranged in patterns for unique and artistic installations.',
      dimensions: '4" x 4" x 1"',
      price: 'Starting at $7.99 per tile'
    },
    {
      title: 'Custom Cuts',
      description: 'Custom-cut bricks and tiles to fit your specific design needs and space requirements.',
      dimensions: 'Custom dimensions',
      price: 'Contact for custom pricing'
    }
  ];

  // Benefits list
  const benefits = [
    'Improved air quality by trapping pollutants, allergens, and moisture',
    'Enhanced respiratory health helping conditions like asthma, allergies, and bronchitis',
    'Mood enhancement reducing stress, anxiety, and depression',
    'Natural ionization creating a fresh, clean environment',
    'Unique aesthetic appeal with warm amber glow',
    'Durable and long-lasting construction',
    'Easy installation and low maintenance',
    'Natural humidity regulation'
  ];

  return (
    <Layout>
      <Helmet>
        <title>Himalayan Salt Bricks & Tiles | Dr. Abdul PHS</title>
        <meta name="description" content="Transform your space with our Himalayan Pink Salt Bricks & Tiles. Create beautiful and health-enhancing salt walls for homes, spas, restaurants, and wellness spaces." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-neutral-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
                Transform Your Space with <span className="text-secondary">Salt Bricks & Tiles</span>
              </h1>
              <p className="text-lg text-neutral-600 mb-6">
                Enhance your home decor and well-being with our premium Himalayan Pink Salt Bricks & Tiles – combining stunning aesthetics with natural health benefits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Request a Quote</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/products">Browse All Products</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/8112897/pexels-photo-8112897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Himalayan Salt Brick Wall"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                style={{ maxHeight: '500px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Beyond Culinary Use: The Evolution of Himalayan Salt</h2>
            <p className="text-lg text-neutral-700 mb-8">
              Himalayan Pink Salt has evolved beyond its culinary uses to become a unique and health-enhancing element in home décor. Among the most popular applications are Himalayan Salt Bricks and Tiles, which have become essential components for creating stunning and healthy interior spaces. At Dr. Abdul PHS, we provide a wide range of Himalayan Salt Bricks and Tiles in various shapes and designs to help you plan and transform your home or commercial space into a serene and beautiful environment.
            </p>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Applications of Himalayan Salt Bricks & Tiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <Card key={index} className="overflow-hidden h-full">
                <div className="h-56 overflow-hidden">
                  <img 
                    src={app.imageSrc}
                    alt={app.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{app.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{app.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Product Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productOptions.map((product, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>
                    {product.dimensions}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{product.description}</p>
                  <p className="text-secondary font-semibold">{product.price}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/contact">Inquire Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-8">Benefits of Himalayan Pink Salt Walls</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 mr-2 text-secondary flex-shrink-0 mt-0.5" />
                    <p>{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/10273368/pexels-photo-10273368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Salt wall installation"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Installation and Maintenance */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Easy Installation and Maintenance</h2>
            <p className="text-lg text-neutral-700 mb-8">
              Himalayan Pink Salt Bricks and Tiles are easy to install and maintain, making them a practical addition to any space. Their durability and natural properties ensure long-lasting benefits, allowing you to enjoy the health and aesthetic advantages for years to come. Our expert team can provide installation guidance or connect you with experienced installers in your area.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Experience the Benefits with Dr. Abdul PHS</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            At Dr. Abdul PHS, we are proud to be a leading supplier and manufacturer of Himalayan Pink Salt Bricks and Tiles. Our products are crafted from the finest quality Himalayan salt, ensuring purity, durability, and effectiveness. Whether you're looking to create a salt wall in your home, spa, or commercial space, we have the expertise and resources to bring your vision to life.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-secondary hover:bg-neutral-100">
            <Link href="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}