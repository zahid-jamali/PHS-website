import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-neutral-offwhite to-primary-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Khewra Salt Mine Image Banner */}
        <div className="mb-16 overflow-hidden rounded-xl shadow-lg">
          <img 
            src="/images/KHEWRA SALT MINE001.jpg" 
            alt="Khewra Salt Mine - The Source of Pink Himalayan Salt" 
            className="w-full h-auto object-cover"
          />
          <div className="bg-secondary-dark text-white py-3 px-4 text-center">
            <p className="font-medium">Khewra Salt Mine - The ancient source of our premium Pink Himalayan Salt</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">The Story Behind <span className="text-accent">Dr. Abdul PHS</span></h2>
            <div className="w-20 h-1 bg-secondary mb-8"></div>
            
            <p className="text-lg mb-6">
              Founded by Dr. Abdul, a leading expert in halotherapy, our company bridges the ancient salt mines of Pakistan with global wellness needs. With decades of experience in salt therapy and nutrition, Dr. Abdul has dedicated his career to sharing the benefits of Pink Himalayan Salt worldwide.
            </p>
            
            <p className="text-lg mb-8">
              Our mission is simple: provide the purest Pink Himalayan Salt directly from the source, eliminating middlemen to ensure premium quality at competitive prices. With our warehouse in the USA, we can deliver quickly across North America while maintaining our direct sourcing from Pakistan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                asChild
                className="bg-secondary hover:bg-secondary-dark text-white font-accent"
              >
                <a href="#contact">
                  Contact Us <i className="fas fa-envelope ml-2"></i>
                </a>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="bg-transparent border-2 border-secondary hover:bg-secondary hover:text-white text-secondary font-accent"
              >
                <a href="#products">
                  Our Products <i className="fas fa-box ml-2"></i>
                </a>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Dr. Abdul PHS logo */}
            <div className="rounded-xl overflow-hidden h-64">
              <img 
                src="/images/logo.webp" 
                alt="Dr. Abdul PHS logo" 
                className="w-full h-full object-contain bg-white p-4" 
              />
            </div>
            
            {/* A cave of pink Himalayan salt crystals illuminated by soft light */}
            <div className="rounded-xl overflow-hidden h-64 -mt-12">
              <img 
                src="/images/KHEWRA SALT MINE IMAGES.jpg" 
                alt="Pink Himalayan salt mine" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Workers in a Himalayan salt mine in Pakistan */}
            <div className="rounded-xl overflow-hidden h-64 -mt-12">
              <img 
                src="/images/KHEWRA SM 02.jpeg" 
                alt="Salt mining in Pakistan" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Close-up of various pink salt products arranged artistically */}
            <div className="rounded-xl overflow-hidden h-64">
              <img 
                src="/images/CARVED SALT LAMPS 2.webp" 
                alt="Pink salt products arrangement" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
