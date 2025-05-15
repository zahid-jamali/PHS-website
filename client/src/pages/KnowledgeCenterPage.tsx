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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Book, Droplets, FileText, Heart, History, Leaf, Mountain, Sparkle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function KnowledgeCenterPage() {
  const { t } = useTranslation();

  // Articles for the knowledge center
  const articles = [
    {
      id: "history-of-phs",
      title: "History of Pink Himalayan Salt",
      description: "Discover the fascinating 800-million-year history of Pink Himalayan Salt and how it was formed deep within the ancient sea beds of the Himalayan mountains.",
      icon: <History className="h-8 w-8 text-primary" />,
      image: "/assets/salt-lamps/KHEWRA SALT MINE001.jpg",
      link: "/knowledge/history-of-pink-himalayan-salt"
    },
    {
      id: "mining-process",
      title: "The Mining Process",
      description: "Learn about the traditional and modern techniques used to extract Pink Himalayan Salt from the Khewra Salt Mine in Pakistan.",
      icon: <Mountain className="h-8 w-8 text-primary" />,
      image: "/assets/salt-lamps/KHEWRA SALT MINE IMAGES.jpg",
      link: "/knowledge/mining-process"
    },
    {
      id: "mineral-composition",
      title: "Mineral Composition & Benefits",
      description: "Explore the unique mineral composition of Pink Himalayan Salt, containing 84+ trace minerals and elements essential for human health.",
      icon: <Sparkle className="h-8 w-8 text-primary" />,
      image: "/assets/salt-lamps/KHEWRA SALT MINE.jpg",
      link: "/knowledge/mineral-composition"
    },
    {
      id: "culinary-uses",
      title: "Culinary Uses & Benefits",
      description: "Discover how to incorporate Pink Himalayan Salt into your cooking and the unique flavor profiles it brings to different cuisines.",
      icon: <Droplets className="h-8 w-8 text-primary" />,
      image: "/assets/salt-lamps/entrance.jpg",
      link: "/knowledge/culinary-uses"
    },
    {
      id: "health-benefits",
      title: "Health & Wellness Benefits",
      description: "Learn about the numerous health benefits of Pink Himalayan Salt including respiratory support, skin health, and digestive improvements.",
      icon: <Heart className="h-8 w-8 text-primary" />,
      image: "/assets/salt-lamps/8a8a1f0c-913d-44d6-9349-062dd2aefeed.jpeg",
      link: "/knowledge/health-benefits"
    },
    {
      id: "sustainability",
      title: "Sustainability & Eco-Friendly Practices",
      description: "Understand how our Pink Himalayan Salt products are ethically sourced and our commitment to sustainable mining and production practices.",
      icon: <Leaf className="h-8 w-8 text-primary" />,
      image: "/assets/salt-lamps/Khewra-Salt-Mine-1024.jpg",
      link: "/knowledge/sustainability"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Knowledge Center | Pink Himalayan Salt | Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content="Explore our knowledge center to learn about the history, mining process, health benefits and culinary uses of Pink Himalayan Salt. Educational resources about nature's purest salt." 
        />
        <meta
          name="keywords" 
          content="pink himalayan salt, himalayan salt education, salt benefits, salt history, salt mining, mineral composition, salt culinary uses" 
        />
      </Helmet>

      {/* Hero Section */}
      <div 
        className="relative py-24 bg-cover bg-center" 
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/salt-lamps/KHEWRA SALT MINE.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            {t('knowledgeCenter.title', 'Pink Himalayan Salt Knowledge Center')}
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            {t('knowledgeCenter.subtitle', 'Explore the fascinating world of Pink Himalayan Salt - from ancient history to modern health applications')}
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
                <BreadcrumbPage>{t('knowledgeCenter.breadcrumb', 'Knowledge Center')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block p-3 bg-secondary/10 rounded-full mb-4">
              <Book className="h-8 w-8 text-secondary" />
            </div>
            <h2 className="text-3xl font-heading font-bold mb-6">{t('knowledgeCenter.introTitle', 'Explore the World of Pink Himalayan Salt')}</h2>
            <p className="text-lg text-gray-700">
              {t('knowledgeCenter.introText', 'Our knowledge center is your educational resource for everything about Pink Himalayan Salt. From its ancient geological origins to its modern applications in health, cuisine, and wellness, discover the science and stories behind nature\'s purest mineral treasure.')}
            </p>
          </div>

          {/* Knowledge Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-3">
                    {article.icon}
                    <CardTitle className="text-xl font-heading">{t(`knowledgeCenter.articles.${article.id}.title`, article.title)}</CardTitle>
                  </div>
                  <CardDescription>
                    {t(`knowledgeCenter.articles.${article.id}.description`, article.description)}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={article.link}>
                      {t('common.readMore', 'Read More')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-neutral-beige">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">
            {t('knowledgeCenter.ctaTitle', 'Ready to Experience the Benefits of Pink Himalayan Salt?')}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            {t('knowledgeCenter.ctaText', 'Explore our premium selection of Pink Himalayan Salt products and bring the natural healing power of the Himalayas into your home.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/products">
                {t('common.shopNow', 'Shop Now')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/research">
                {t('knowledgeCenter.viewResearch', 'View Research Papers')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}