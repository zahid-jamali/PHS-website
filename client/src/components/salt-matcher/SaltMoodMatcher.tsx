import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  AlertCircle, 
  CheckCircle2, 
  ChefHat, 
  Music, 
  Smile, 
  Star 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define types for salt flavors based on our database schema
interface SaltFlavor {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  createdAt: Date | null;
  productId: number | null;
  tasteProfile: "mild" | "medium" | "strong" | "exotic" | "herbal" | "spicy" | "smoky" | "citrusy" | "floral";
  matchingMoods: ("energetic" | "calm" | "focused" | "creative" | "adventurous")[];
  culinaryUses: string[] | null;
  benefitsDescription: string | null;
}

// Define mood options and taste profile options for the UI
const moodOptions = [
  { value: "energetic", icon: <Smile className="h-4 w-4 mr-2" /> },
  { value: "calm", icon: <Music className="h-4 w-4 mr-2" /> },
  { value: "focused", icon: <AlertCircle className="h-4 w-4 mr-2" /> },
  { value: "creative", icon: <Star className="h-4 w-4 mr-2" /> },
  { value: "adventurous", icon: <ChefHat className="h-4 w-4 mr-2" /> },
];

const tasteOptions = [
  { value: "mild" },
  { value: "medium" },
  { value: "strong" },
  { value: "exotic" },
  { value: "herbal" },
  { value: "spicy" },
  { value: "smoky" },
  { value: "citrusy" },
  { value: "floral" },
];

export default function SaltMoodMatcher() {
  const [selectedTab, setSelectedTab] = useState<string>("mood");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedTaste, setSelectedTaste] = useState<string | null>(null);
  const { toast } = useToast();
  const { t } = useTranslation(["translation"]);
  
  // Fetch all salt flavors to display as a fallback
  const { data: allSaltFlavors, isLoading: isLoadingAll } = useQuery({
    queryKey: ["/api/salt-flavors"],
    enabled: true,
  });
  
  // Fetch salt flavors by mood when a mood is selected
  const { data: moodSaltFlavors, isLoading: isLoadingMood } = useQuery({
    queryKey: ["/api/salt-flavors/mood", selectedMood],
    enabled: !!selectedMood,
  });
  
  // Fetch salt flavors by taste profile when a taste is selected
  const { data: tasteSaltFlavors, isLoading: isLoadingTaste } = useQuery({
    queryKey: ["/api/salt-flavors/taste", selectedTaste],
    enabled: !!selectedTaste,
  });
  
  // Determine which salt flavors to display based on the active tab and selections
  const saltFlavorsToDisplay = () => {
    if (selectedTab === "mood" && selectedMood && moodSaltFlavors) {
      return moodSaltFlavors;
    } else if (selectedTab === "taste" && selectedTaste && tasteSaltFlavors) {
      return tasteSaltFlavors;
    } else {
      return allSaltFlavors;
    }
  };
  
  const isLoading = isLoadingAll || isLoadingMood || isLoadingTaste;
  
  const handleAddToCart = (salt: SaltFlavor) => {
    // This would be replaced with actual cart functionality
    toast({
      title: t("flavor_matcher.added_to_cart"),
      description: t("flavor_matcher.added_to_cart_message", { name: salt.name }),
      variant: "default",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">{t("flavor_matcher.page_title")}</h2>
        <p className="text-muted-foreground mt-2">
          {t("flavor_matcher.subheader")}
        </p>
      </div>
      
      <Tabs 
        value={selectedTab}
        onValueChange={(value) => {
          setSelectedTab(value);
          setSelectedMood(null);
          setSelectedTaste(null);
        }}
        className="w-full max-w-3xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="mood">{t("flavor_matcher.match_by_mood")}</TabsTrigger>
          <TabsTrigger value="taste">{t("flavor_matcher.match_by_taste")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mood" className="space-y-6">
          <div className="flex justify-center mb-6">
            <Select
              value={selectedMood || ""}
              onValueChange={setSelectedMood}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder={t("flavor_matcher.mood_prompt")} />
              </SelectTrigger>
              <SelectContent>
                {moodOptions.map((mood) => (
                  <SelectItem key={mood.value} value={mood.value}>
                    <div className="flex items-center">
                      {mood.icon}
                      {t(`flavor_matcher.moods.${mood.value}`)}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
        
        <TabsContent value="taste" className="space-y-6">
          <div className="flex justify-center mb-6">
            <Select
              value={selectedTaste || ""}
              onValueChange={setSelectedTaste}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder={t("flavor_matcher.taste_prompt")} />
              </SelectTrigger>
              <SelectContent>
                {tasteOptions.map((taste) => (
                  <SelectItem key={taste.value} value={taste.value}>
                    {t(`flavor_matcher.tastes.${taste.value}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>
      
      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {saltFlavorsToDisplay()?.map((salt: SaltFlavor) => (
            <Card key={salt.id} className="overflow-hidden h-full flex flex-col">
              <div className="relative h-48 bg-muted">
                <img 
                  src={salt.imageUrl} 
                  alt={salt.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{salt.name}</CardTitle>
                <CardDescription>{salt.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">{t("flavor_matcher.taste_profile")}:</p>
                  <Badge variant="outline" className="capitalize">
                    {t(`flavor_matcher.tastes.${salt.tasteProfile}`)}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">{t("flavor_matcher.matching_moods")}:</p>
                  <div className="flex flex-wrap gap-2">
                    {salt.matchingMoods.map((mood) => (
                      <Badge key={mood} variant="secondary" className="capitalize">
                        {t(`flavor_matcher.moods.${mood}`)}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {salt.culinaryUses && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">{t("flavor_matcher.culinary_uses")}:</p>
                    <div className="flex flex-wrap gap-2">
                      {salt.culinaryUses.map((use) => (
                        <Badge key={use} variant="outline" className="capitalize">
                          {use}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {salt.benefitsDescription && (
                  <div className="mt-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 px-0">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>{t("flavor_matcher.benefits")}</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{salt.benefitsDescription}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Navigate to product details
                    // This would link to the related product if there is one
                    if (salt.productId) {
                      window.location.href = `/products/${salt.productId}`;
                    } else {
                      toast({
                        title: t("flavor_matcher.details_button"),
                        description: t("viewing_details", { name: salt.name }),
                      });
                    }
                  }}
                >
                  {t("flavor_matcher.details_button")}
                </Button>
                <Button onClick={() => handleAddToCart(salt)}>
                  {t("flavor_matcher.add_to_cart_button")}
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {(!saltFlavorsToDisplay() || saltFlavorsToDisplay().length === 0) && (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold mb-2">{t("flavor_matcher.no_matches")}</h3>
              <p className="text-muted-foreground">
                {t("flavor_matcher.try_different")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}