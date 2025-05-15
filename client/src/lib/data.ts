import { Product } from "@shared/schema";

// Blog post data type
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  author?: string;
  content?: string;
}

// Blog posts for the blog page
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Powerful Synergetic Action of Pink Himalayan Salt",
    slug: "powerful-synergetic-action-phs",
    category: "research",
    excerpt: "Dr. Abdul explains how the 84+ natural minerals in Pink Himalayan Salt work together through powerful synergetic action to benefit human health.",
    image: "/images/knowledge-centre/powerful-synergetic-action-phs.jpg",
    date: "May 10, 2023",
    readTime: "7 min read",
    author: "Dr. Abdul",
    content: `
      <h2>Powerful Synergetic Action of Pink Himalayan salt (PHS)</h2>
      <p>Written by Dr. Abdul</p>
      
      <p>Many people often ask how pink Himalayan salt PHS, which contains more than 84 natural minerals in trace amounts, can have powerful beneficial effects on the human body and brain. They wonder how such small quantities of minerals can be impactful when their individual amounts seem insufficient to produce significant benefits. Here, we explain the powerful synergetic action of PHS and its effects on the human body and brain.</p>
      
      <p>These individuals may not be aware of the concept of synergetic action—the combined effect of elements working together to enhance their impact. The minerals in Pink Himalayan salt, including calcium, potassium, sodium, chloride, iron, phosphorus, sulfur, chromium, copper, zinc, magnesium, manganese, and others, support and enhance each other's actions. Together, they work synergistically to support various bodily functions and promote overall health.</p>
      
      <h3>Synergetic Actions of Pink Himalayan salt</h3>
      <p>The combined action of these minerals allows PHS to:</p>
      
      <h4>1: Act as a detoxification agent</h4>
      <p>PHS helps draw out toxins from the body, promoting cleansing and overall wellness</p>
      
      <h4>2: Maintain electrolyte and PH balance</h4>
      <p>Its balanced mineral composition supports hydration, fluid regulation, and PH balance in the body</p>
      
      <h4>3: Alkalize the body</h4>
      <p>The alkalizing nature of PHS aids in reducing acidity and supporting metabolic functions.</p>
      
      <h4>4: Improve digestion and respiratory health</h4>
      <p>It enhances digestion by stimulating digestive enzymes and supports respiratory health by cleaning mucus and improving lung function.</p>
      
      <h4>5: Regulate blood pressure and blood sugar levels</h4>
      <p>The minerals in PHS help balance sodium, and potassium levels, contributing to healthier blood pressure and glucose regulation</p>
      
      <h4>6: Enhance skin health</h4>
      <p>When used externally, PHS nourishes the skin, reduces inflammation, and promotes healing.</p>
      
      <h4>7: Relieve muscle cramps and joint pain</h4>
      <p>PHS' magnesium, potassium and calcium content help relax muscles and reduce pain</p>
      
      <h4>8: Promote better sleep and mood</h4>
      <p>PHS supports restful sleep and mood regulation by balancing stress-related hormones and enhancing relaxation.</p>
      
      <h3>Understanding synergetic action with a simple example</h3>
      <p>To understand synergetic action, consider a simple example involving medications. Suppose you take two tablets of TYLENOL (500mg each) for severe body pain, or alternatively, two tablets of Aspirin (500 mg each). Both provide a total dose of 1000 mg. Now imagine taking one tablet of TYLENOL (500Mg) and one tablet of Aspirin (500 MG) TOGETHER-the total dose remains 1000mg. However, their combined action results in faster and more effective pain relief compared to taking either medication alone.</p>
      
      <p>Similarly, the natural minerals in PHS, when combined, work synergistically to produce powerful and miraculous effects on the human body and brain. These effects go beyond what individual mineral could achieve on their own.</p>
      
      <p>I hope this explanation helps you understand the remarkable power of synergetic action and how it applies to the benefit of Pink Himalayan salt.</p>
    `
  },
  {
    id: 2,
    title: "Animal Licks: Essential Minerals for Livestock and Wildlife",
    slug: "animal-licks-minerals-livestock-wildlife",
    category: "research",
    excerpt: "Discover how Himalayan Salt animal licks provide crucial minerals for livestock and wildlife health, enhancing growth, reproduction, and overall wellbeing.",
    image: "/images/knowledge-centre/animal-licks-minerals-livestock-wildlife.webp",
    date: "April 22, 2023",
    readTime: "8 min read",
    author: "Dr. Abdul",
    content: `
      <h2>Animal Licks: Essential Minerals for Livestock and Wildlife</h2>
      
      <h3>Importance of Minerals for Animal Health</h3>
      <p>Minerals are essential for the health and well-being of livestock such as cows, sheep, goats, camels, and horses. These nutrients play a vital role in maintaining a balanced and healthy life for animals. Himalayan Salt offers premium quality animal licking salt that provides these necessary mineral supplements to support animal health.</p>
      
      <h3>Benefits of Year-Round Salt Access</h3>
      <p>Studies show that animals with access to salt all year round cope better with feed, are healthier, and more reproductive. It is crucial for animals to consume salt according to their instinct and bodily requirements. Our salt blocks come in rock format, preventing animals from devouring them and instead allowing them to lick the salt gradually. These blocks are natural, without preservatives or sweeteners, ensuring pure salt intake for animals throughout the year.</p>
      
      <h3>Himalayan Rock Salt Lick Specifications</h3>
      <p>Our Himalayan Rock Salt animal licks are available in various standard weight categories:</p>
      <ul>
        <li>1-2 kg</li>
        <li>2-3 kg</li>
        <li>3-4 kg</li>
        <li>4-5 kg</li>
      </ul>
      <p>Custom weights and shapes are also available upon request.</p>
      
      <h3>Essential Minerals in Himalayan Salt Licks</h3>
      <p>Himalayan animal lick salt contains all the essential minerals required for the good health and growth of animals. It is a vital part of their diet, rich in phosphorus, sodium, and calcium, which are crucial for bone health. Additionally, it is abundant in natural iron and zinc, promoting muscle development and strengthening the digestive system. During cold weather, it fulfills the animals' salt needs, supporting their natural growth and development.</p>
      
      <h3>Mineral Composition and Benefits</h3>
      <ul>
        <li><strong>Phosphorus, Sodium, Calcium:</strong> Essential for bone health.</li>
        <li><strong>Iron & Zinc:</strong> Help in muscle development and digestive system strengthening.</li>
        <li><strong>Copper, Potassium, Magnesium:</strong> Enhance overall health and improve appetite.</li>
      </ul>
      <p>Regular diets often lack sufficient natural trace minerals, which are diminished through rainwater. Animal salt licks become essential in providing these minerals, ensuring proper nutrition and health.</p>
      
      <h3>Enhancing Livestock Health</h3>
      <p>Livestock requires better resistance and reproduction capabilities. Himalayan Salt supplies vital nutrients for strong tissue, nerve, and immune system functions, crucial for cattle well-being. Many beef producers rely on salt to improve the health of their cows. Cattle need to consume salt routinely as it is a fundamental mineral for their overall health.</p>
      
      <h3>Horses and Himalayan Salt</h3>
      <p>Horses have historically been essential for humans, whether for traveling, wars, or sports like racing and polo. Proper care, including a balanced diet with essential nutrients, is necessary for their well-being. Himalayan salt is a significant part of their diet, providing:</p>
      <ul>
        <li><strong>Electrolytes:</strong> Replacing lost salts from sweating during competition or travel.</li>
        <li><strong>Improved Water Intake:</strong> Reducing dehydration and enhancing nutrient absorption.</li>
        <li><strong>Better Blood Flow:</strong> Supporting healthy cell formation and overall vitality.</li>
      </ul>
      
      <h3>Salt Lick for Wild Animals</h3>
      <p>Salt licks are also beneficial for wild animals like deer, moose, and squirrels, attracting them for hunting or wildlife photography. They are used in zoos and wildlife parks to ensure animals receive necessary bioenergetic resources. Wildlife researchers utilize salt licks for tracking and medicinal purposes, emphasizing the importance of using original Himalayan salt licks to avoid adverse effects on animals.</p>
      
      <h3>Conclusion</h3>
      <p>Salt is a crucial component of animals' diets, similar to its importance for humans. A lack of salt can cause numerous health issues, which is why rock salt and its products are used alongside regular feed to meet animals' salt intake requirements. Himalayan Salt Licks and loose Himalayan Salt feed or chunks are excellent sources of essential minerals and trace elements for animals, including horses, sheep, cows, deer, and ponies.</p>
      
      <h3>Benefits of Himalayan Salt Licks</h3>
      <ul>
        <li>Contains over 80 elements, aiding in nervous system development and bone formation.</li>
        <li>Strengthens physical health and the immune system.</li>
        <li>Improves milk production in cows.</li>
      </ul>
      <p>In summary, Himalayan Salt Licks provide a vital source of minerals necessary for the growth, health, and well-being of various animals, making them an indispensable part of their diet.</p>
    `
  },
  {
    id: 3,
    title: "The Ancient Origins of Pink Himalayan Salt",
    slug: "ancient-origins-pink-himalayan-salt",
    category: "educational",
    excerpt: "Explore the fascinating geological history of the Khewra Salt Mine and how this ancient sea salt became embedded in the Himalayan mountains.",
    image: "/images/knowledge-centre/ancient-origins-pink-himalayan-salt.jpg",
    date: "June 12, 2023",
    readTime: "5 min read"
  },
  {
    id: 4,
    title: "Halotherapy: A Comprehensive Guide",
    slug: "halotherapy-comprehensive-guide",
    category: "halotherapy",
    excerpt: "Learn about the science behind salt therapy, its historical roots, and the modern applications for respiratory health and wellness.",
    image: "/images/knowledge-centre/halotherapy-comprehensive-guide.webp",
    date: "May 28, 2023",
    readTime: "8 min read"
  },
  {
    id: 5,
    title: "Culinary Secrets: Cooking with Pink Salt",
    slug: "culinary-secrets-cooking-pink-salt",
    category: "culinary",
    excerpt: "Discover creative ways to use Pink Himalayan Salt in your cooking, from salt block grilling to infused salts that elevate any dish.",
    image: "/images/knowledge-centre/culinary-secrets-cooking-pink-salt.png",
    date: "April 15, 2023",
    readTime: "6 min read"
  },
  {
    id: 6,
    title: "The Healing Power of Pink Himalayan Salt",
    slug: "healing-power-pink-himalayan-salt",
    category: "health",
    excerpt: "Discover the ancient wisdom and modern science behind the therapeutic properties of Pink Himalayan Salt.",
    image: "/images/knowledge-centre/healing-power-pink-himalayan-salt.webp",
    date: "June 5, 2023",
    readTime: "12 min read"
  },
  {
    id: 7,
    title: "Setting Up Your Own Salt Therapy Room",
    slug: "setting-up-salt-therapy-room",
    category: "halotherapy",
    excerpt: "A step-by-step guide to creating an effective salt therapy space for your wellness business or home.",
    image: "/images/knowledge-centre/setting-up-salt-therapy-room.webp",
    date: "March 17, 2023",
    readTime: "10 min read"
  },
  {
    id: 8,
    title: "Pink Salt vs. Table Salt: What's the Difference?",
    slug: "pink-salt-vs-table-salt",
    category: "educational",
    excerpt: "An in-depth comparison of Pink Himalayan Salt and regular table salt, from mineral content to health benefits.",
    image: "/images/knowledge-centre/pink-salt-vs-table-salt.webp",
    date: "February 8, 2023",
    readTime: "7 min read"
  }
];

// Testimonial data type
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
}

// Testimonials for various sections
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael Roberts",
    role: "Health Food Store Owner",
    image: "/images/salt-lamps/FIREBOWL SALT.jpg",
    text: "We've been sourcing our salt products from Dr. Abdul PHS for over two years now. The quality is consistently excellent, and their wholesale prices allow us to maintain healthy margins.",
    rating: 5
  },
  {
    id: 2,
    name: "Jennifer Chang",
    role: "Spa Owner",
    image: "/images/salt-lamps/SWAN CARVED SALT LAMP.png",
    text: "The halotherapy consultation service was invaluable for our spa. Dr. Abdul helped us create a beautiful salt room that has become our most popular feature. Our revenue has increased by 30%!",
    rating: 5
  },
  {
    id: 3,
    name: "Carlos Mendez",
    role: "Executive Chef",
    image: "/images/salt-lamps/Salt-Lamp USB POWERED.jpg",
    text: "I switched to Dr. Abdul's culinary salt for my restaurants, and the difference in taste is remarkable. Customers notice the improved flavor, and I appreciate the direct sourcing and sustainability aspects.",
    rating: 4.5
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Wellness Center Director",
    image: "/images/salt-lamps/KHEWRA SALT MINE IMAGES.jpg",
    text: "Dr. Abdul's expertise helped us create the perfect salt therapy room for our wellness center. Our clients love it and keep coming back for more sessions.",
    rating: 5
  }
];

// FAQ data type
export interface FAQ {
  question: string;
  answer: string;
}

// FAQs for various sections
export const faqs: FAQ[] = [
  {
    question: "What makes Pink Himalayan Salt different from regular salt?",
    answer: "Pink Himalayan Salt contains over 84 minerals and trace elements not found in regular table salt. It's minimally processed, contains no additives, and has a more complex flavor profile. The distinctive pink color comes from the presence of iron oxide and other minerals."
  },
  {
    question: "Where do you source your salt from?",
    answer: "All our Pink Himalayan Salt is sourced directly from the renowned Khewra Salt Mine in Pakistan, the second largest salt mine in the world. We maintain direct relationships with local mining communities to ensure fair practices and consistent quality."
  },
  {
    question: "Is Pink Himalayan Salt healthier than regular salt?",
    answer: "Pink Himalayan Salt contains more minerals than regular table salt and is free from additives like anti-caking agents. While it's still sodium chloride and should be consumed in moderation, many people prefer it for its purity, mineral content, and more balanced flavor."
  },
  {
    question: "What are the shipping costs and delivery times?",
    answer: "We offer free shipping on US orders over $99. Standard delivery typically takes 3-5 business days within the continental US. Express shipping options are available at checkout. International shipping rates and delivery times vary by location."
  },
  {
    question: "Do you offer wholesale pricing?",
    answer: "Yes, we offer competitive wholesale pricing for retailers, restaurants, spas, and other businesses. Please visit our wholesale page to submit an inquiry, and our team will provide you with our catalog and pricing information."
  }
];

// Team member data type
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

// Team members for about page
export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Abdul Rahman",
    role: "Founder & Salt Expert",
    image: "/images/PHS CHUNK LAMP.webp",
    bio: "With over 15 years of experience in halotherapy and nutritional science, Dr. Abdul has dedicated his career to promoting the health benefits of Pink Himalayan Salt."
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "Chief Operations Officer",
    image: "/images/salt-lamps/FIREBOWL SALT.jpg",
    bio: "Sophia oversees our global supply chain and ensures that every product meets our rigorous quality standards before reaching our customers."
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Head of Wholesale",
    image: "/images/salt-lamps/SWAN CARVED SALT LAMP.png",
    bio: "James works closely with our business partners to provide customized wholesale solutions that meet their specific needs and requirements."
  }
];

// Client logos (placeholder URLs, would be replaced with actual client logos)
export const clientLogos: string[] = [
  "https://assets.algoexpert.io/spas/main/prod/g7dedbc7984-prod/dist/images/6591cdc0d3ae0b19c45e.png",
  "https://assets.algoexpert.io/spas/main/prod/g7dedbc7984-prod/dist/images/3b7d9f4b073deb2f7f40.png",
  "https://assets.algoexpert.io/spas/main/prod/g7dedbc7984-prod/dist/images/3cd767dea94a85078ca4.png",
  "https://assets.algoexpert.io/spas/main/prod/g7dedbc7984-prod/dist/images/a2b3c3709ffedce2a22a.png",
  "https://assets.algoexpert.io/spas/main/prod/g7dedbc7984-prod/dist/images/f50ae7cbf6cc805e22c5.png"
];
