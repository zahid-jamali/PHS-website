export default function Features() {
  const features = [
    {
      icon: "fas fa-leaf",
      title: "100% Pure & Natural",
      description: "Our salt is sourced directly from ancient salt mines in Pakistan, free from additives and pollutants."
    },
    {
      icon: "fas fa-truck",
      title: "Direct Supply Chain",
      description: "From mine to your doorstep, cutting out middlemen for better prices and quality control."
    },
    {
      icon: "fas fa-certificate",
      title: "Expert Consultation",
      description: "Dr. Abdul provides expert halotherapy guidance and custom solutions for health centers."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-neutral-offwhite rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-6">
                <i className={`${feature.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-neutral-brown">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
