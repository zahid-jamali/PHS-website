import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Star, Cog, Presentation, Stethoscope, Heart, ShieldCheck } from "lucide-react";
import saltTherapySpaImg from "../../assets/salt-therapy-spa.webp";

export default function HalotherapySection() {
  return (
    <section id="halotherapy" className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">Halotherapy Solutions</h2>
          <p className="text-lg max-w-3xl mx-auto mt-4">
            Specialized salt therapy products and consultation services for wellness centers and spa facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative">
            <img 
              src={saltTherapySpaImg}
              alt="Professional Salt Therapy Room Design" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
            
            <div className="absolute -bottom-6 -right-6 bg-primary rounded-lg shadow-lg p-6 max-w-xs">
              <p className="text-md italic font-heading text-neutral-dark">
                "Dr. Abdul's expertise helped us create the perfect salt therapy room for our wellness center. Our clients love it!"
              </p>
              <div className="flex items-center mt-4">
                <img 
                  src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5" 
                  alt="Sarah Johnson, Wellness Center Director" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="text-sm font-semibold">Sarah Johnson</p>
                  <p className="text-xs text-gray-600">Wellness Center Director</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-heading font-semibold mb-6">Elevate Your Wellness Offerings</h3>
            <p className="mb-6">
              Halotherapy (salt therapy) is growing in popularity as clients seek natural wellness solutions. Our expert team led by Dr. Abdul provides everything you need to create effective salt therapy spaces.
            </p>
            
            <div className="mb-8">
              <h4 className="text-xl font-heading font-medium mb-4">Our Halotherapy Services Include:</h4>
              <div className="space-y-4">
                <div className="bg-neutral-beige p-5 rounded-lg">
                  <h5 className="font-heading font-semibold mb-2 flex items-center">
                    <Star className="text-secondary mr-2 h-5 w-5" />
                    Consultation & Design
                  </h5>
                  <p className="text-sm">Expert guidance on creating salt therapy rooms tailored to your space and clientele.</p>
                </div>
                
                <div className="bg-neutral-beige p-5 rounded-lg">
                  <h5 className="font-heading font-semibold mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                    Premium Halotherapy Salt
                  </h5>
                  <p className="text-sm">Pharmaceutical-grade salt specifically processed for halotherapy applications.</p>
                </div>
                
                <div className="bg-neutral-beige p-5 rounded-lg">
                  <h5 className="font-heading font-semibold mb-2 flex items-center">
                    <Cog className="text-secondary mr-2 h-5 w-5" />
                    Equipment & Accessories
                  </h5>
                  <p className="text-sm">Halogenerators, salt blocks, panels, and all necessary components for your salt room.</p>
                </div>
                
                <div className="bg-neutral-beige p-5 rounded-lg">
                  <h5 className="font-heading font-semibold mb-2 flex items-center">
                    <Presentation className="text-secondary mr-2 h-5 w-5" />
                    Training & Support
                  </h5>
                  <p className="text-sm">Comprehensive training for your staff on halotherapy benefits and facility management.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild className="btn-primary">
                <Link href="/contact">
                  Schedule a Consultation
                </Link>
              </Button>
              <Button variant="outline" asChild className="btn-outline">
                <Link href="/downloads/halotherapy-guide.pdf">
                  Download Halotherapy Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Salt Therapy Benefits */}
        <div className="mt-20">
          <h3 className="text-2xl font-heading font-semibold text-center mb-10">Benefits of Halotherapy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-beige rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="text-secondary text-2xl" />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-3">Respiratory Health</h4>
              <p>Helps alleviate symptoms of asthma, bronchitis, and other respiratory conditions by reducing inflammation and clearing airways.</p>
            </div>
            
            <div className="bg-neutral-beige rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-secondary text-2xl" />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-3">Stress Reduction</h4>
              <p>Creates a tranquil environment that promotes relaxation, reduces stress, and improves overall mental wellbeing.</p>
            </div>
            
            <div className="bg-neutral-beige rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="text-secondary text-2xl" />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-3">Immune Support</h4>
              <p>Negative ions from salt help strengthen the immune system and improve overall resilience to common illnesses.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
