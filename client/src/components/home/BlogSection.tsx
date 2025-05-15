import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Ancient Origins of Pink Himalayan Salt",
    excerpt: "Explore the fascinating geological history of the Khewra Salt Mine and how this ancient sea salt became embedded in the Himalayan mountains.",
    image: "/assets/KHEWRA SALT MINE IMAGES.jpg",
    date: "June 12, 2023",
    readTime: "5 min read",
    slug: "ancient-origins-pink-himalayan-salt"
  },
  {
    id: 2,
    title: "Halotherapy: A Comprehensive Guide",
    excerpt: "Learn about the science behind salt therapy, its historical roots, and the modern applications for respiratory health and wellness.",
    image: "/assets/102.webp",
    date: "May 28, 2023",
    readTime: "8 min read",
    slug: "halotherapy-comprehensive-guide"
  },
  {
    id: 3,
    title: "Culinary Secrets: Cooking with Pink Salt",
    excerpt: "Discover creative ways to use Pink Himalayan Salt in your cooking, from salt block grilling to infused salts that elevate any dish.",
    image: "/assets/105.webp",
    date: "April 15, 2023",
    readTime: "6 min read",
    slug: "culinary-secrets-cooking-pink-salt"
  }
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">Salt Knowledge Center</h2>
          <p className="text-lg max-w-3xl mx-auto mt-4">
            Explore our resources about Pink Himalayan Salt benefits, applications, and industry insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <Link href={`/blog/${post.slug}`} className="block">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <Link href={`/blog/${post.slug}`} className="block">
                  <h3 className="text-xl font-heading font-semibold mb-3 hover:text-secondary transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="text-secondary font-accent text-sm font-semibold hover:underline inline-flex items-center">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" asChild className="btn-outline">
            <Link href="/blog">
              View All Articles
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
