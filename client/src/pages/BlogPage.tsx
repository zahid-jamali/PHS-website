import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { blogPosts } from "@/lib/data";
import { Helmet } from "react-helmet";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "health", label: "Health & Wellness" },
    { value: "culinary", label: "Culinary" },
    { value: "halotherapy", label: "Halotherapy" },
    { value: "educational", label: "Educational" }
  ];

  return (
    <>
      <Helmet>
        <title>Salt Knowledge Center | Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content="Explore our collection of articles about Pink Himalayan Salt benefits, applications, and industry insights. Learn about halotherapy, culinary uses, and more."
        />
        <meta name="keywords" content="Pink Himalayan Salt, salt therapy, halotherapy, salt benefits, culinary salt, salt education" />
      </Helmet>

      <div className="bg-neutral-beige py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Salt Knowledge Center</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Salt Knowledge Center</h1>
          <p className="text-lg mb-8">
            Explore our resources about Pink Himalayan Salt benefits, applications, and industry insights
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                className="pl-10"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select 
              value={categoryFilter} 
              onValueChange={(value) => setCategoryFilter(value)}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                <Link href={`/blog/${post.slug}`} className="block h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>
                <CardContent className="p-6">
                  <Badge className="mb-2 bg-primary text-primary-foreground">
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </Badge>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-heading font-semibold mb-3 hover:text-secondary transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{post.readTime}</span>
                    {post.author && (
                      <>
                        <span className="mx-2">•</span>
                        <span>By {post.author}</span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-secondary font-accent text-sm font-semibold hover:underline inline-flex items-center">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-gray-600 mb-4">We couldn't find any articles matching your search criteria.</p>
              <Button onClick={() => {setSearchQuery(""); setCategoryFilter("all");}}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {filteredPosts.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Button variant="outline" className="mr-2">Previous</Button>
            <Button variant="outline" className="ml-2">Next</Button>
          </div>
        )}

        {/* Featured Article */}
        <div className="mt-20 bg-neutral-beige p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-2 bg-secondary text-white">Featured Article</Badge>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                The Healing Power of Pink Himalayan Salt
              </h2>
              <p className="mb-4">
                Discover the ancient wisdom and modern science behind the therapeutic properties of Pink Himalayan Salt. 
                From respiratory health to skin care, explore how this mineral-rich salt is transforming wellness practices around the world.
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="mr-2 h-4 w-4" />
                <span>June 5, 2023</span>
                <span className="mx-2">•</span>
                <Clock className="mr-1 h-4 w-4" />
                <span>12 min read</span>
              </div>
              <Button asChild className="btn-primary">
                <Link href="/blog/healing-power-pink-himalayan-salt">
                  Read Full Article
                </Link>
              </Button>
            </div>
            <div>
              <img 
                src="/images/knowledge-centre/healing-power-pink-himalayan-salt.webp" 
                alt="The Healing Power of Pink Himalayan Salt" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Stay updated with our latest articles, salt therapy tips, and exclusive offers. Join our community of salt enthusiasts and wellness advocates.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <Input 
              placeholder="Your email address" 
              className="mb-3 sm:mb-0 sm:mr-3"
            />
            <Button className="btn-primary">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
