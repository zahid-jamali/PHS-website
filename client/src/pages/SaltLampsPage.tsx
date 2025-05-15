import React from 'react';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import ProductImage from '@/components/ui/ProductImage';
import saltLampImg from '@/assets/salt-lamp.jpg';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SaltLampsPage() {
  // Benefits section
  const benefits = [
    {
      title: 'Natural Air Purification',
      description: 'Releases negative ions that neutralize pollutants, allergens, and electromagnetic radiation',
      icon: '💨'
    },
    {
      title: 'Mood Enhancement',
      description: 'Warm amber glow helps reduce stress, anxiety, and promotes better sleep patterns',
      icon: '😌'
    },
    {
      title: 'Respiratory Health',
      description: 'Helps alleviate symptoms of asthma, allergies, and other respiratory conditions',
      icon: '🫁'
    },
    {
      title: 'Natural Remedy',
      description: 'A holistic alternative to antibiotics and artificial medicines for overall wellness',
      icon: '🌿'
    }
  ];

  // Featured products
  const featuredProducts = [
    {
      title: 'Natural Shape Salt Lamp',
      description: 'Handcrafted from a single salt crystal, each lamp is unique in shape and size, emitting a warm, soothing glow that enhances any room\'s ambiance.',
      imageSrc: '/assets/salt-lamps/CARVED SALT LAMPS 2.webp',
      price: '$29.99 - $59.99'
    },
    {
      title: 'PHS Chunk Lamp',
      description: 'Beautiful pink Himalayan chunks in an elegant iron pot, perfect for your living room or kitchen. Purifies surrounding air by removing pathogens and toxins with powerful detoxifying properties.',
      imageSrc: '/assets/salt-lamps/PHS CHUNK LAMP.webp',
      price: '$39.99'
    },
    {
      title: 'Carved Salt Lamp',
      description: 'Artistically carved Himalayan salt lamps in various designs including spheres, pyramids, and bowls. Each piece is a beautiful functional art object.',
      imageSrc: '/assets/salt-lamps/SWAN CARVED SALT LAMP.png',
      price: '$44.99 - $79.99'
    },
    {
      title: 'USB Salt Lamp',
      description: 'Compact USB-powered Himalayan salt lamps perfect for desks, offices, or travel. Enjoy the benefits of salt therapy wherever you go.',
      imageSrc: saltLampImg,
      price: '$24.99'
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "I received a PHS lamp as a gift, and I couldn't be happier. The warm glow is perfect for my bedroom, and I've noticed I sleep much better since using it.",
      name: "Sarah M.",
      location: "Denver, CO"
    },
    {
      quote: "After switching from table salt to Pink Himalayan salt and adding a salt lamp to my home office, my allergies have significantly improved. I'm a customer for life!",
      name: "James L.",
      location: "Austin, TX"
    },
    {
      quote: "The chunk lamp is not only beautiful but has become a conversation starter when guests visit. Everyone wants to know where I got it!",
      name: "Patricia K.",
      location: "Seattle, WA"
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Himalayan Salt Lamps | Dr. Abdul PHS</title>
        <meta name="description" content="Transform your space with our authentic Himalayan salt lamps. Experience natural air purification, improved mood, and a beautiful amber glow that enhances any room." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-neutral-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
                Authentic <span className="text-secondary">Himalayan</span> Salt Lamps
              </h1>
              <p className="text-lg text-neutral-600 mb-6">
                More than just a beautiful decor piece — discover the wellness revolution with our premium salt lamps that naturally purify air and enhance your wellbeing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/wholesale">Wholesale Orders</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg shadow-lg overflow-hidden" style={{ maxHeight: '500px' }}>
                <ProductImage
                  src={saltLampImg}
                  alt="Himalayan Salt Lamp with warm glow"
                  className="w-full h-auto object-cover"
                  aspectRatio="landscape"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Natural Healing for Body and Mind</h2>
            <p className="text-lg text-neutral-700 mb-8">
              Pink Himalayan salt is not just a perfect gift item—it also offers incredible wellness benefits for both the body and mind. With its natural healing properties, its popularity is skyrocketing as more people turn away from antibiotics and artificial medicines in favor of holistic remedies. Among these, Pink Himalayan salt stands out as one of the best for overall health.
            </p>
            <p className="text-lg text-neutral-700">
              PHS has sparked a revolution, leading the way as people worldwide switch from regular table salt to our high-quality Pink Himalayan salt. Social media is flooded with praise for its benefits, and its demand continues to rise globally.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Experience the Benefits</h2>
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

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Featured Salt Lamps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProducts.map((product, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <ProductImage 
                    src={product.imageSrc}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    aspectRatio="landscape"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription className="text-secondary font-semibold">
                    {product.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{product.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/products">View Details</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/products">Add to Cart</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="text-4xl text-secondary mb-2">"</div>
                </CardHeader>
                <CardContent>
                  <p className="italic mb-4">{testimonial.quote}</p>
                  <div className="text-right">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-neutral-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Experience the Magic Today!</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            PHS Lamps have transformed lifestyles, becoming the go-to gift for loved ones. When someone receives one of these beautiful and health-boosting lamps, the joy is undeniable.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-secondary hover:bg-neutral-100">
            <Link href="/products">Order Your Favorite PHS Lamp Now</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}