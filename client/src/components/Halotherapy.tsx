import { Button } from '@/components/ui/button';

export default function Halotherapy() {
  const solutionCards = [
    {
      icon: "fas fa-building",
      title: "Business Setup",
      description: "Complete consultation for new salt therapy centers, including room design, equipment selection, and business planning.",
      action: { text: "Learn More", link: "#contact" }
    },
    {
      icon: "fas fa-box-open",
      title: "Salt Supply",
      description: "Ongoing pharmaceutical-grade salt supply for halotherapy generators, ensuring the highest purity standards.",
      action: { text: "Get Pricing", link: "#wholesale" }
    },
    {
      icon: "fas fa-hands-helping",
      title: "Ongoing Support",
      description: "Technical support, staff training, and marketing advice to help your salt therapy business thrive.",
      action: { text: "Contact Us", link: "#contact" }
    }
  ];

  const benefits = [
    "Support for respiratory conditions",
    "Skin rejuvenation and support for skin conditions",
    "Stress reduction and relaxation",
    "Immune system support"
  ];

  return (
    <section id="halotherapy" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Salt Therapy Solutions</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-lg text-neutral-brown">Led by Dr. Abdul, we provide complete solutions for salt therapy centers, spas, and wellness facilities. From equipment consultation to ongoing salt supply.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            {/* A professional salt therapy room with multiple clients relaxing in chairs */}
            <img 
              src="/assets/salt-lamps/PHS ARABIAN HORSE LAMP.webp" 
              alt="Professional salt therapy room" 
              className="rounded-xl shadow-lg w-full h-auto" 
            />
          </div>
          
          <div>
            <h3 className="font-heading text-2xl font-semibold mb-4">What is Halotherapy?</h3>
            <p className="text-lg mb-6">
              Halotherapy, or salt therapy, is a holistic approach that mimics the microclimate of salt caves. Pharmaceutical-grade salt is ground into microscopic particles and dispersed into the air of a controlled environment. These particles may help support respiratory health, skin conditions, and overall wellness.
            </p>
            
            <h4 className="font-heading text-xl font-medium mb-3">Potential Benefits:</h4>
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 mr-3">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              asChild
              className="bg-secondary hover:bg-secondary-dark text-white font-accent"
            >
              <a href="#contact">
                Consult with Dr. Abdul <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutionCards.map((card, index) => (
            <div key={index} className="bg-neutral-offwhite rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-6">
                <i className={`${card.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-4 text-center">{card.title}</h3>
              <p className="text-neutral-brown text-center mb-6">{card.description}</p>
              <a href={card.action.link} className="text-accent hover:text-accent-dark font-accent text-center block">
                {card.action.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
