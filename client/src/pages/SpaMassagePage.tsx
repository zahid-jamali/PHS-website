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

export default function SpaMassagePage() {
  // Benefits section
  const benefits = [
    {
      title: 'Customizable Solutions',
      description: 'Products tailored to your specific business needs in size, shape, and design',
      icon: '🎨'
    },
    {
      title: 'Premium Quality',
      description: '100% pure Himalayan Pink Salt with rich mineral content and therapeutic properties',
      icon: '✨'
    },
    {
      title: 'Health Benefits',
      description: 'Improves skin health, detoxifies the body, reduces inflammation, and enhances relaxation',
      icon: '💆‍♀️'
    },
    {
      title: 'Competitive Pricing',
      description: 'Excellent value with special discounts available for bulk orders',
      icon: '💰'
    }
  ];

  // Product range
  const products = [
    {
      title: 'Himalayan Salt Massage Stones',
      description: 'Hand-carved smooth stones perfect for hot stone massages, providing deep relaxation and mineral-rich benefits to the skin and muscles.',
      imageSrc: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Himalayan Salt Scrubs',
      description: 'Finely ground salt scrubs blended with natural oils and herbs to exfoliate the skin gently, leaving it soft and revitalized.',
      imageSrc: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Himalayan Salt Sauna Bricks',
      description: 'Ideal for building salt walls in saunas, these bricks create a soothing ambiance while releasing beneficial negative ions.',
      imageSrc: 'https://images.pexels.com/photos/3212164/pexels-photo-3212164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Himalayan Salt Lamps',
      description: 'Beyond their aesthetic appeal, these products improve air quality and create a serene environment, perfect for spa settings.',
      imageSrc: 'https://images.pexels.com/photos/4195499/pexels-photo-4195499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Spa & Massage Products | Dr. Abdul PHS</title>
        <meta name="description" content="Enhance your wellness experience with our customized Himalayan Pink Salt spa and massage products. We offer massage stones, salt scrubs, sauna bricks, and more." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-neutral-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
                Himalayan Pink Salt <span className="text-secondary">Spa & Massage</span> Products
              </h1>
              <p className="text-lg text-neutral-600 mb-6">
                Elevate your wellness experience with our premium, customized Himalayan Pink Salt spa solutions – designed to enhance relaxation, wellness, and client satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Get Custom Quote</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/products">View All Products</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Himalayan Salt Spa Treatment"
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
            <h2 className="text-3xl font-bold mb-6">Leading Manufacturer of Himalayan Salt Spa Solutions</h2>
            <p className="text-lg text-neutral-700 mb-8">
              At Dr. Abdul PHS, we are proud to be a leading manufacturer and supplier of high-quality, customized Himalayan Pink Salt spa and massage products. Our offerings are crafted to elevate the wellness experience, combining the natural benefits of Himalayan Pink Salt with innovative designs tailored to meet your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="text-4xl mb-2">{benefit.icon}</div>
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Product Range</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.imageSrc}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{product.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Inquire Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner with Us */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Partner with Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Expert Craftsmanship</h3>
                <p>Our team of skilled artisans ensures that every product meets stringent quality standards.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Sustainable Practices</h3>
                <p>We source our Himalayan Pink Salt responsibly and ensure minimal environmental impact.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Customer-Centric</h3>
                <p>We prioritize satisfaction by offering flexible customization, quick turnaround times, and responsive support.</p>
              </div>
            </div>
            <Button asChild size="lg" variant="secondary" className="bg-white text-secondary hover:bg-neutral-100">
              <Link href="/contact">Get a Custom Quotation Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Transform Your Spa or Wellness Center</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Discover how our exquisite range of Himalayan Pink Salt products can enhance your offerings and delight your clients. Contact us now to explore our tailored solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/wholesale">Wholesale Information</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}