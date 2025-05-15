import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, PackageCheck, Leaf, BarChart3 } from 'lucide-react';

// Define packaging types with their carbon footprint values (in kg CO2e per kg of material)
const PACKAGING_MATERIALS = {
  plasticPET: { name: 'Plastic (PET)', footprint: 2.7, recyclable: true, biodegradable: false },
  plasticHDPE: { name: 'Plastic (HDPE)', footprint: 1.8, recyclable: true, biodegradable: false },
  paper: { name: 'Paper', footprint: 1.1, recyclable: true, biodegradable: true },
  cardboard: { name: 'Cardboard', footprint: 0.8, recyclable: true, biodegradable: true },
  glassClear: { name: 'Glass (Clear)', footprint: 0.9, recyclable: true, biodegradable: false },
  aluminum: { name: 'Aluminum', footprint: 8.1, recyclable: true, biodegradable: false },
  biodegradablePlastic: { name: 'Biodegradable Plastic', footprint: 0.8, recyclable: true, biodegradable: true },
  woodenBox: { name: 'Wooden Box', footprint: 0.6, recyclable: true, biodegradable: true },
  jute: { name: 'Jute Bag', footprint: 0.4, recyclable: true, biodegradable: true },
  cottonBag: { name: 'Cotton Bag', footprint: 0.3, recyclable: true, biodegradable: true },
};

// Distance carbon emissions for transport (kg CO2e per ton-km)
const TRANSPORT_EMISSIONS = {
  road: 0.096, // Truck transport
  rail: 0.028, // Rail transport
  sea: 0.008, // Sea freight
  air: 0.602, // Air freight
};

type PackagingMaterialKey = keyof typeof PACKAGING_MATERIALS;
type TransportModeKey = keyof typeof TRANSPORT_EMISSIONS;

const CarbonCalculatorPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('calculator');
  const [packagingMaterial, setPackagingMaterial] = useState<PackagingMaterialKey>('biodegradablePlastic');
  const [packagingWeight, setPackagingWeight] = useState(0.1); // kg
  const [productWeight, setProductWeight] = useState(1.0); // kg
  const [distance, setDistance] = useState(1000); // km
  const [transportMode, setTransportMode] = useState<TransportModeKey>('road');
  const [reuseTimes, setReuseTimes] = useState(1);
  const [packagingFootprint, setPackagingFootprint] = useState(0);
  const [transportFootprint, setTransportFootprint] = useState(0);
  const [totalFootprint, setTotalFootprint] = useState(0);
  const [comparisons, setComparisons] = useState<{material: PackagingMaterialKey, footprint: number}[]>([]);
  
  // Calculate the carbon footprint
  useEffect(() => {
    // Calculate packaging footprint
    const materialFootprint = PACKAGING_MATERIALS[packagingMaterial].footprint * packagingWeight;
    const adjustedPackagingFootprint = materialFootprint / Math.max(1, reuseTimes);
    
    // Calculate transport footprint
    const totalWeight = (productWeight + packagingWeight) / 1000; // Convert to tons
    const transportFootprint = TRANSPORT_EMISSIONS[transportMode] * distance * totalWeight;
    
    // Calculate total footprint
    const total = adjustedPackagingFootprint + transportFootprint;
    
    setPackagingFootprint(adjustedPackagingFootprint);
    setTransportFootprint(transportFootprint);
    setTotalFootprint(total);
  }, [packagingMaterial, packagingWeight, productWeight, distance, transportMode, reuseTimes]);
  
  // Generate comparisons for all materials
  useEffect(() => {
    const materialComparisons = Object.keys(PACKAGING_MATERIALS).map((material) => {
      const materialKey = material as PackagingMaterialKey;
      const materialFootprint = PACKAGING_MATERIALS[materialKey].footprint * packagingWeight / Math.max(1, reuseTimes);
      const transportEmission = TRANSPORT_EMISSIONS[transportMode] * distance * ((productWeight + packagingWeight) / 1000);
      return {
        material: materialKey,
        footprint: materialFootprint + transportEmission
      };
    });
    
    // Sort by carbon footprint (lowest first)
    materialComparisons.sort((a, b) => a.footprint - b.footprint);
    setComparisons(materialComparisons);
  }, [packagingWeight, productWeight, distance, transportMode, reuseTimes]);
  
  // Find the ranking of the current material
  const currentRanking = comparisons.findIndex(item => item.material === packagingMaterial) + 1;
  
  // Calculate reduction percentage compared to the worst option
  const worstOption = comparisons[comparisons.length - 1]?.footprint || 0;
  const reductionPercentage = worstOption ? ((worstOption - totalFootprint) / worstOption) * 100 : 0;

  return (
    <div className="container mx-auto py-12 px-4">
      <Helmet>
        <title>{t('translation.carbonCalculator.title')} | Pink Himalayan Salt</title>
        <meta 
          name="description" 
          content={t('translation.carbonCalculator.metaDescription')}
        />
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {t('translation.carbonCalculator.title')}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t('translation.carbonCalculator.intro')}
        </p>
        
        <Tabs defaultValue="calculator" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <PackageCheck className="h-4 w-4" /> {t('translation.carbonCalculator.calculator')}
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> {t('translation.carbonCalculator.results')}
            </TabsTrigger>
            <TabsTrigger value="ecoInfo" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" /> {t('translation.carbonCalculator.ecoInfo')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator">
            <Card>
              <CardHeader>
                <CardTitle>{t('translation.carbonCalculator.calculatorTitle')}</CardTitle>
                <CardDescription>
                  {t('translation.carbonCalculator.calculatorDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="packaging-material">{t('translation.carbonCalculator.packagingMaterial')}</Label>
                  <Select value={packagingMaterial} onValueChange={(value) => setPackagingMaterial(value as PackagingMaterialKey)}>
                    <SelectTrigger id="packaging-material">
                      <SelectValue placeholder={t('translation.carbonCalculator.selectPackagingMaterial')} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PACKAGING_MATERIALS).map(([key, { name }]) => (
                        <SelectItem key={key} value={key}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-muted-foreground">
                    {t('translation.carbonCalculator.carbonIntensity')}: {PACKAGING_MATERIALS[packagingMaterial].footprint} kg CO2e/kg
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="packaging-weight">{t('translation.carbonCalculator.packagingWeight')} (kg)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="packaging-weight"
                      min={0.01}
                      max={1}
                      step={0.01}
                      value={[packagingWeight]}
                      onValueChange={(value) => setPackagingWeight(value[0])}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={packagingWeight}
                      onChange={(e) => setPackagingWeight(parseFloat(e.target.value) || 0)}
                      className="w-20"
                      min={0.01}
                      step={0.01}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="product-weight">{t('translation.carbonCalculator.productWeight')} (kg)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="product-weight"
                      min={0.1}
                      max={10}
                      step={0.1}
                      value={[productWeight]}
                      onValueChange={(value) => setProductWeight(value[0])}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={productWeight}
                      onChange={(e) => setProductWeight(parseFloat(e.target.value) || 0)}
                      className="w-20"
                      min={0.1}
                      step={0.1}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="transportation-distance">{t('translation.carbonCalculator.transportationDistance')} (km)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="transportation-distance"
                      min={10}
                      max={10000}
                      step={10}
                      value={[distance]}
                      onValueChange={(value) => setDistance(value[0])}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={distance}
                      onChange={(e) => setDistance(parseInt(e.target.value) || 0)}
                      className="w-20"
                      min={10}
                      step={10}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="transport-mode">{t('translation.carbonCalculator.transportationMode')}</Label>
                  <Select value={transportMode} onValueChange={(value) => setTransportMode(value as TransportModeKey)}>
                    <SelectTrigger id="transport-mode">
                      <SelectValue placeholder={t('translation.carbonCalculator.selectTransportMode')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="road">{t('translation.carbonCalculator.roadTransport')}</SelectItem>
                      <SelectItem value="rail">{t('translation.carbonCalculator.railTransport')}</SelectItem>
                      <SelectItem value="sea">{t('translation.carbonCalculator.seaFreight')}</SelectItem>
                      <SelectItem value="air">{t('translation.carbonCalculator.airFreight')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="reuse-times">{t('translation.carbonCalculator.reuseTimes')}</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="reuse-times"
                      min={1}
                      max={50}
                      step={1}
                      value={[reuseTimes]}
                      onValueChange={(value) => setReuseTimes(value[0])}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={reuseTimes}
                      onChange={(e) => setReuseTimes(parseInt(e.target.value) || 1)}
                      className="w-20"
                      min={1}
                      step={1}
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={() => setActiveTab('results')}
                >
                  {t('translation.carbonCalculator.viewResults')} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>{t('translation.carbonCalculator.resultsTitle')}</CardTitle>
                <CardDescription>
                  {t('translation.carbonCalculator.resultsDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Material: {PACKAGING_MATERIALS[packagingMaterial].name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {PACKAGING_MATERIALS[packagingMaterial].biodegradable ? 'Biodegradable' : 'Non-biodegradable'} | 
                        {PACKAGING_MATERIALS[packagingMaterial].recyclable ? ' Recyclable' : ' Non-recyclable'}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <Label>{t('translation.carbonCalculator.packagingFootprint')}</Label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{t('translation.carbonCalculator.packagingMaterial')}:</span>
                        <span className="font-medium">{packagingFootprint.toFixed(3)} kg CO2e</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label>{t('translation.carbonCalculator.transportFootprint')}</Label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{t('translation.carbonCalculator.transportation')} ({distance} km):</span>
                        <span className="font-medium">{transportFootprint.toFixed(3)} kg CO2e</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{t('translation.carbonCalculator.totalFootprint')}:</span>
                        <span className="font-bold">{totalFootprint.toFixed(3)} kg CO2e</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 pt-3">
                      <Label>{t('translation.carbonCalculator.environmentalRanking')}</Label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{t('translation.carbonCalculator.ranking')}:</span>
                        <span className="font-medium">#{currentRanking} of {comparisons.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{t('translation.carbonCalculator.carbonReduction')}:</span>
                        <span className="font-medium">{reductionPercentage.toFixed(1)}% {t('translation.carbonCalculator.lessThanWorst')}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-4" 
                      onClick={() => setActiveTab('calculator')}
                      variant="outline"
                    >
                      {t('translation.carbonCalculator.backToCalculator')}
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{t('translation.carbonCalculator.materialComparison')}</h3>
                    <div className="space-y-3">
                      {comparisons.map((item, index) => (
                        <div key={item.material} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${item.material === packagingMaterial ? 'font-bold' : ''}`}>
                              {index + 1}. {PACKAGING_MATERIALS[item.material].name}
                            </span>
                            <span className={`text-sm ${item.material === packagingMaterial ? 'font-bold' : ''}`}>
                              {item.footprint.toFixed(3)} kg CO2e
                            </span>
                          </div>
                          <Progress 
                            value={(item.footprint / (worstOption || 1)) * 100} 
                            className={item.material === packagingMaterial ? "h-2 bg-muted" : "h-1.5 bg-muted/50"} 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ecoInfo">
            <Card>
              <CardHeader>
                <CardTitle>Eco-Friendly Packaging Information</CardTitle>
                <CardDescription>
                  Learn about sustainable packaging options and their environmental benefits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-headings:mb-3 prose-p:mt-1 prose-p:mb-3 max-w-none">
                  <h3>Our Commitment to Sustainable Packaging</h3>
                  <p>
                    At Dr. Abdul PHS, we're committed to minimizing our environmental impact. Our eco-friendly 
                    packaging options are designed to reduce carbon emissions, utilize renewable resources, and 
                    minimize waste throughout our supply chain.
                  </p>
                  
                  <h3>Benefits of Eco-Friendly Packaging</h3>
                  <ul>
                    <li>
                      <strong>Reduced Carbon Footprint:</strong> Sustainable materials generally require less 
                      energy to produce and transport, resulting in fewer greenhouse gas emissions.
                    </li>
                    <li>
                      <strong>Biodegradability:</strong> Many eco-friendly materials break down naturally, 
                      reducing long-term environmental pollution.
                    </li>
                    <li>
                      <strong>Recyclability:</strong> Materials that can be reprocessed help create a circular 
                      economy and reduce landfill waste.
                    </li>
                    <li>
                      <strong>Reusability:</strong> Packaging designed for multiple uses significantly reduces 
                      its lifetime carbon footprint.
                    </li>
                  </ul>
                  
                  <h3>Our Sustainable Packaging Options</h3>
                  <p>
                    We offer several sustainable packaging options for our Pink Himalayan Salt products:
                  </p>
                  <ul>
                    <li>
                      <strong>Biodegradable Packaging:</strong> Made from plant-based materials that naturally 
                      decompose, leaving minimal environmental impact.
                    </li>
                    <li>
                      <strong>Jute and Cotton Bags:</strong> Natural, reusable, and biodegradable alternatives 
                      to plastic that can be repurposed many times.
                    </li>
                    <li>
                      <strong>Wooden Boxes:</strong> Sustainably sourced wooden packaging that's biodegradable 
                      and adds a premium feel to our salt products.
                    </li>
                    <li>
                      <strong>Recycled Cardboard:</strong> Made from post-consumer materials, our cardboard 
                      packaging reduces the need for virgin paper production.
                    </li>
                  </ul>
                  
                  <h3>Making Better Choices</h3>
                  <p>
                    When selecting packaging for your Pink Himalayan Salt products, consider these factors:
                  </p>
                  <ul>
                    <li>How many times can the packaging be reused?</li>
                    <li>Is the material biodegradable or recyclable in your area?</li>
                    <li>What is the total weight of the packaging compared to the product?</li>
                    <li>How far does the product need to travel?</li>
                  </ul>
                  <p>
                    Use our carbon footprint calculator to compare different options and make the most 
                    environmentally responsible choice for your needs.
                  </p>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={() => setActiveTab('calculator')}
                  variant="outline"
                >
                  Back to Calculator
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CarbonCalculatorPage;