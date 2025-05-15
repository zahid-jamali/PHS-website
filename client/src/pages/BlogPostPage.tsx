import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BlogPost } from "@shared/schema";
import { truncateText } from "@/lib/utils";

export default function BlogPostPage() {
  const [match, params] = useRoute("/blog/:id");
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: [`/api/blog-posts/${params?.id}`],
    enabled: !!params?.id,
  });

  const { data: relatedPosts, isLoading: relatedLoading } = useQuery({
    queryKey: ['/api/blog-posts/related', params?.id],
    enabled: !!post,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        <p className="mt-4">Loading article...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="font-heading text-2xl font-bold mb-4">Article Not Found</h1>
        <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <a href="/blog">Back to Blog</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>{post.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary-light text-accent text-sm py-1 px-4 rounded-full">
              {post.category}
            </span>
            <span className="text-neutral-brown">{post.date}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-neutral-brown">{post.author.role}</div>
              </div>
            </div>
            <div className="text-neutral-brown">
              <i className="fas fa-clock mr-2"></i>
              {post.readTime} min read
            </div>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto"
          />
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          {post.content.map((section, index) => (
            <div key={index} className="mb-8">
              {section.heading && (
                <h2 className="font-heading text-2xl font-semibold mb-4">{section.heading}</h2>
              )}
              <div className="space-y-4">
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
              {section.image && (
                <div className="my-6 rounded-lg overflow-hidden">
                  <img 
                    src={section.image.url} 
                    alt={section.image.alt || "Illustration"} 
                    className="w-full h-auto" 
                  />
                  {section.image.caption && (
                    <p className="text-sm text-center text-neutral-brown mt-2">{section.image.caption}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-neutral-offwhite hover:bg-primary-light transition-colors text-neutral-brown px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Separator className="my-12" />

        <div className="flex flex-col md:flex-row items-center gap-6 bg-neutral-offwhite p-6 rounded-xl">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
              <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold mb-2">About {post.author.name}</h3>
            <p className="text-neutral-brown mb-4">{post.author.bio}</p>
            <div className="flex gap-4">
              <a href="#" className="text-accent hover:text-accent-dark">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-accent hover:text-accent-dark">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-accent hover:text-accent-dark">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {!relatedLoading && relatedPosts && relatedPosts.length > 0 && (
        <div className="mt-16">
          <h3 className="font-heading text-2xl font-semibold mb-8 text-center">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.slice(0, 3).map((relatedPost: BlogPost) => (
              <Card key={relatedPost.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="mb-2">
                    <span className="bg-primary-light text-accent text-xs py-1 px-2 rounded-full">
                      {relatedPost.category}
                    </span>
                  </div>
                  <h4 className="font-heading text-lg font-semibold mb-2">{relatedPost.title}</h4>
                  <p className="text-neutral-brown text-sm mb-4 line-clamp-2">
                    {truncateText(relatedPost.excerpt, 100)}
                  </p>
                  <Button asChild variant="link" className="text-accent hover:text-accent-dark p-0">
                    <a href={`/blog/${relatedPost.id}`}>
                      Read More <i className="fas fa-arrow-right ml-1"></i>
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
