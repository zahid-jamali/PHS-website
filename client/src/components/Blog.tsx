import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { BlogPost } from '@shared/schema';

export default function Blog() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['/api/blog-posts'],
    staleTime: 60000, // 1 minute
  });

  if (isLoading) {
    return (
      <section id="blog" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Salt Therapy Resources</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-lg text-neutral-brown mb-8">Loading blog posts...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Salt Therapy Resources</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-lg text-red-500 mb-8">Error loading blog posts. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Salt Therapy Resources</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-lg text-neutral-brown">Explore our educational content about Pink Himalayan Salt benefits, applications, and the science behind halotherapy.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts?.slice(0, 3).map((post: BlogPost) => (
            <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover" 
                />
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <span className="bg-primary-light text-accent text-xs py-1 px-3 rounded-full">{post.category}</span>
                  <span className="text-neutral-brown text-sm ml-2">{post.date}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-neutral-brown text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <Link href={`/blog/${post.id}`} className="text-accent hover:text-accent-dark transition-colors font-accent text-sm inline-flex items-center">
                  Read More <i className="fas fa-arrow-right ml-1"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/blog" className="inline-flex items-center font-accent font-medium text-accent hover:text-accent-dark transition-colors">
            View All Articles <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
