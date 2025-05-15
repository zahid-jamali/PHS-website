import { Link } from "wouter";
import { Helmet } from "react-helmet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, History as HistoryIcon, MapPin, Mountain, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HistoryOfPHSPage() {
  const { t } = useTranslation();

  // Historical timeline data
  const timeline = [
    {
      id: "ancient-sea",
      era: "800 Million Years Ago",
      title: "Ancient Sea Evaporation",
      content: "The story begins around 800 million years ago when a shallow ancient sea gradually evaporated, leaving behind vast salt deposits. These deposits were eventually sealed by layers of lava and clay, preserving the salt in its remarkably pure form.",
      icon: <Clock className="h-6 w-6 text-primary" />
    },
    {
      id: "himalayan-formation",
      era: "50 Million Years Ago",
      title: "Himalayan Mountain Formation",
      content: "Around 50 million years ago, tectonic movement caused the Indian subcontinent to collide with Asia, forming the Himalayan mountain range. This movement raised the ancient seabed and its preserved salt deposits thousands of feet above sea level.",
      icon: <Mountain className="h-6 w-6 text-primary" />
    },
    {
      id: "discovery",
      era: "326 BCE",
      title: "Discovery by Alexander the Great",
      content: "Alexander the Great's armies are believed to have discovered the salt deposits in 326 BCE during their campaigns in the region. Their horses were observed licking the salty rocks, which led to the human discovery of this valuable resource.",
      icon: <HistoryIcon className="h-6 w-6 text-primary" />
    },
    {
      id: "khewra-mine",
      era: "1200s CE",
      title: "Establishment of Khewra Salt Mine",
      content: "The Khewra Salt Mine, the primary source of Pink Himalayan Salt today, was formally established in the early 13th century. Located in what is now Pakistan's Punjab region, it is the second largest salt mine in the world.",
      icon: <MapPin className="h-6 w-6 text-primary" />
    },
    {
      id: "modern-mining",
      era: "19th Century",
      title: "Modern Mining Operations",
      content: "During British colonial rule in the 19th century, systematic mining operations were established at Khewra, introducing improved extraction techniques. The mine was developed with a main tunnel design that is still in use today.",
      icon: <HistoryIcon className="h-6 w-6 text-primary" />
    },
    {
      id: "global-popularity",
      era: "21st Century",
      title: "Global Recognition & Popularity",
      content: "In the early 21st century, Pink Himalayan Salt gained worldwide recognition for its purity, health benefits, and distinctive appearance. It has become one of Pakistan's most valued exports and is now used in culinary, therapeutic, and decorative applications globally.",
      icon: <CheckCircle className="h-6 w-6 text-primary" />
    }
  ];

  return (
    <>
      <Helmet>
        <title>History of Pink Himalayan Salt | Knowledge Center | Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content="Discover the fascinating 800-million-year history of Pink Himalayan Salt, from ancient sea formation to modern mining in the Khewra Salt Mine of Pakistan." 
        />
        <meta
          name="keywords" 
          content="pink himalayan salt history, khewra salt mine, salt formation, ancient salt deposits, alexander the great salt, himalayan mountain formation" 
        />
      </Helmet>

      {/* Hero Section */}
      <div 
        className="relative py-24 bg-cover bg-center" 
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/salt-lamps/entrance.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            {t('knowledge.history.title', 'The History of Pink Himalayan Salt')}
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            {t('knowledge.history.subtitle', 'An 800-million-year journey from ancient seas to the "Salt Range" of Pakistan')}
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-neutral-beige py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">{t('common.home', 'Home')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/knowledge">{t('knowledgeCenter.breadcrumb', 'Knowledge Center')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t('knowledge.history.breadcrumb', 'History of Pink Himalayan Salt')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Introduction */}
          <div className="prose lg:prose-lg max-w-none mb-16">
            <h2 className="text-3xl font-heading font-bold mb-6">
              {t('knowledge.history.introTitle', 'The Ancient Origins of Pink Himalayan Salt')}
            </h2>
            
            <p className="lead text-lg">
              {t('knowledge.history.introText', 'Pink Himalayan Salt is often referred to as "white gold" or "pink gold" due to its rarity, purity, and the numerous benefits it offers. But how did this remarkable mineral form, and what journey has it taken through geological time to become one of the most prized natural resources in the world today?')}
            </p>
            
            <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <img 
                src="/assets/salt-lamps/KHEWRA SALT MINE.webp" 
                alt="Ancient salt formations in Khewra Mine" 
                className="rounded-lg shadow-md w-full h-64 object-cover"
              />
              <img 
                src="/assets/salt-lamps/KHEWRA SALT MINE IMAGES.jpg" 
                alt="Salt mining in Pakistan" 
                className="rounded-lg shadow-md w-full h-64 object-cover"
              />
            </div>
            
            <h3 className="text-2xl font-heading font-semibold mt-10">
              {t('knowledge.history.geologyTitle', 'A Geological Marvel')}
            </h3>
            
            <p>
              {t('knowledge.history.geologyText1', 'Pink Himalayan Salt\'s story begins approximately 800 million years ago during the Precambrian era. At this time, a vast, shallow inland sea covered what would eventually become the Himalayan Mountains. As the climate changed and the sea began to evaporate, it left behind massive salt deposits crystallized in the sun.')}
            </p>
            
            <p>
              {t('knowledge.history.geologyText2', 'These salt deposits were eventually sealed beneath layers of earth and rock, protecting them from contamination and preserving their purity. What makes Pink Himalayan Salt unique is that it remained untouched and unpolluted for hundreds of millions of years, resulting in one of the purest salt deposits on Earth.')}
            </p>
          </div>

          {/* Historical Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">
              {t('knowledge.history.timelineTitle', 'The Journey Through Time')}
            </h2>
            
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-neutral-200"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={item.id} className="relative">
                    {/* Timeline entry with alternating layout on desktop */}
                    <div className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}>
                      {/* Timeline bullet */}
                      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                        {item.icon}
                      </div>
                      
                      {/* Content box */}
                      <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                        <div className="bg-neutral-50 p-6 rounded-lg shadow-sm border border-neutral-100">
                          <div className="text-sm text-primary font-bold mb-1">{item.era}</div>
                          <h3 className="text-xl font-heading font-semibold mb-3">{item.title}</h3>
                          <p className="text-gray-700">{item.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* The Khewra Salt Mine */}
          <div className="prose lg:prose-lg max-w-none mb-16">
            <h2 className="text-3xl font-heading font-bold mb-6">
              {t('knowledge.history.khewraTitle', 'The Khewra Salt Mine: Birthplace of Pink Himalayan Salt')}
            </h2>
            
            <p>
              {t('knowledge.history.khewraText1', 'Located in the Punjab region of Pakistan, the Khewra Salt Mine is the second largest salt mine in the world and the primary source of Pink Himalayan Salt. The mine is part of the Salt Range, a mineral-rich mountain system in the Punjab province extending from the Jhelum River to the Indus River.')}
            </p>
            
            <div className="my-10">
              <img 
                src="/assets/salt-lamps/KHEWRA SM 02.jpeg" 
                alt="Interior of the Khewra Salt Mine" 
                className="rounded-lg shadow-md w-full object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 text-center">Interior chambers of the Khewra Salt Mine in Pakistan</p>
            </div>
            
            <h3 className="text-2xl font-heading font-semibold">
              {t('knowledge.history.discoveryTitle', 'The Legend of Discovery')}
            </h3>
            
            <p>
              {t('knowledge.history.discoveryText', 'According to local legend, the Khewra Salt Mine was discovered in 326 BCE when Alexander the Great\'s army was passing through the region. The soldiers noticed their horses licking the salty rocks. Some accounts suggest that it was Alexander\'s horse, Bucephalus, who first discovered the salt rocks. Observing the horses, the soldiers tasted the rocks themselves and discovered the salt deposits.')}
            </p>
            
            <h3 className="text-2xl font-heading font-semibold mt-10">
              {t('knowledge.history.modernMiningTitle', 'Modern Mining Operations')}
            </h3>
            
            <p>
              {t('knowledge.history.modernMiningText1', 'While salt collection from the area likely dates back thousands of years, systematic mining operations began during the Mughal era. The mine was significantly developed during British colonial rule in the 19th century when British mining engineer Dr. H. Warth introduced the room and pillar method, which is still used today.')}
            </p>
            
            <p>
              {t('knowledge.history.modernMiningText2', 'Today, the Khewra Salt Mine produces around 350,000 tons of salt annually and is estimated to have over 220 million tons of salt reserves. The mine features over 40 kilometers of tunnels across 19 floors, 11 of which are below ground level. Only about 50% of the salt extracted is processed for consumption; the remainder is used for industrial purposes.')}
            </p>
            
            <div className="bg-neutral-beige p-6 rounded-lg mt-10">
              <h3 className="text-xl font-heading font-semibold mb-3">
                {t('knowledge.history.factTitle', 'Fascinating Facts About the Khewra Salt Mine')}
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('knowledge.history.fact1', 'The mine has a small mosque made entirely of salt rock inside it.')}</li>
                <li>{t('knowledge.history.fact2', 'There are salt sculptures and replicas of famous landmarks, including a model of the Great Wall of China, created by miners.')}</li>
                <li>{t('knowledge.history.fact3', 'A small saltwater lake exists within the mine, with salinity levels similar to the Dead Sea.')}</li>
                <li>{t('knowledge.history.fact4', 'The mine has become a tourist attraction, receiving hundreds of thousands of visitors annually.')}</li>
                <li>{t('knowledge.history.fact5', 'There is even a small electric train that takes visitors through parts of the mine.')}</li>
              </ul>
            </div>
          </div>
          
          {/* FAQs */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading font-bold mb-6">
              {t('knowledge.history.faqTitle', 'Frequently Asked Questions')}
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger className="text-lg font-medium">
                  {t('knowledge.history.faq1Question', 'Why is Himalayan salt pink?')}
                </AccordionTrigger>
                <AccordionContent>
                  {t('knowledge.history.faq1Answer', 'The distinctive pink color comes from trace minerals in the salt, primarily iron oxide (rust). The varying shades of pink, red, and white in the salt reflect the varying concentration of these minerals throughout the deposits.')}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="q2">
                <AccordionTrigger className="text-lg font-medium">
                  {t('knowledge.history.faq2Question', 'Is Pink Himalayan Salt actually from the Himalayas?')}
                </AccordionTrigger>
                <AccordionContent>
                  {t('knowledge.history.faq2Answer', 'Yes and no. While the salt comes from the Salt Range mountains which are geologically part of the greater Himalayan mountain system, the Khewra Mine is specifically located in the Punjab region of Pakistan, in the foothills of the Himalayas rather than in the high Himalayan range itself.')}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="q3">
                <AccordionTrigger className="text-lg font-medium">
                  {t('knowledge.history.faq3Question', 'How pure is Pink Himalayan Salt compared to other salts?')}
                </AccordionTrigger>
                <AccordionContent>
                  {t('knowledge.history.faq3Answer', 'Pink Himalayan Salt is considered one of the purest forms of salt available. Having been isolated and protected from modern environmental pollution for millions of years, it contains fewer impurities than many other types of salt. However, its defining feature is actually its rich mineral content with 84+ trace minerals and elements that give it both its color and its health benefits.')}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="q4">
                <AccordionTrigger className="text-lg font-medium">
                  {t('knowledge.history.faq4Question', 'How is Pink Himalayan Salt harvested today?')}
                </AccordionTrigger>
                <AccordionContent>
                  {t('knowledge.history.faq4Answer', 'Today, Pink Himalayan Salt is still largely extracted using traditional mining methods. While some modern equipment is used, much of the mining is done by hand to preserve the salt\'s quality and the ecological balance of the region. Miners use a room and pillar method, where they leave behind pillars of salt to support the mine\'s ceiling as they extract the surrounding salt. This method has been in use since the 19th century.')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          {/* Call to action */}
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold mb-6">
              {t('knowledge.history.ctaTitle', 'Experience This Ancient Treasure For Yourself')}
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              {t('knowledge.history.ctaText', 'Discover our range of authentic Pink Himalayan Salt products, ethically sourced from the Khewra Salt Mine and brought directly from Pakistan to your doorstep.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/products">
                  {t('common.exploreProducts', 'Explore Our Products')}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/knowledge">
                  {t('common.backToKnowledgeCenter', 'Back to Knowledge Center')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}