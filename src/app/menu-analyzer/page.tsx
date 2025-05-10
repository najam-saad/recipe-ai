"use client";

import { useState } from 'react';
import type { MenuAnalysisInput, MenuAnalysisOutput, AnalyzedMenuItem } from '@/types';
import { analyzeMenu } from '@/ai/flows/analyze-menu-flow';
import { ImageUploader } from '@/components/shared/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { UtensilsCrossed, Lightbulb, HelpCircle, BadgeDollarSign, Info, Leaf, Beef, WheatOff, MilkOff } from 'lucide-react';

export default function MenuAnalyzerPage() {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [userQuery, setUserQuery] = useState('');
  const [analysisResult, setAnalysisResult] = useState<MenuAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (dataUrl: string | null) => {
    setImageDataUrl(dataUrl);
    setAnalysisResult(null); 
  };

  const handleAnalyzeMenu = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!imageDataUrl) {
      toast({
        title: 'No Menu Image',
        description: 'Please upload an image of a restaurant menu.',
        variant: 'destructive',
      });
      return;
    }
    if (!userQuery.trim()) {
      toast({
        title: 'Query Required',
        description: 'Please enter your question or preference (e.g., "gluten-free options", "details for Caesar Salad", "calories in Fried Yam").',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const input: MenuAnalysisInput = { photoDataUri: imageDataUrl, userQuery };
      const result = await analyzeMenu(input);
      setAnalysisResult(result);
      toast({
        title: 'Menu Analysis Complete!',
        description: 'Check out the findings below.',
      });
    } catch (error) {
      console.error('Menu analysis error:', error);
      toast({
        title: 'Analysis Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred during menu analysis.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-12">
      <section className="text-center">
        <UtensilsCrossed className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Restaurant Menu Analyzer</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload a photo of a restaurant menu and ask a question! For example, "Which dishes are vegetarian?" or "What are the ingredients and nutritional info for the 'House Special Pasta'?".
        </p>
      </section>

      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Analyze a Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAnalyzeMenu} className="space-y-6">
            <div>
              <Label htmlFor="menu-image-upload" className="text-base mb-1 block">Upload Menu Photo</Label>
              <ImageUploader onImageUpload={handleImageUpload} aspectRatio="9/16" />
            </div>
            <div>
              <Label htmlFor="user-query-input" className="text-base">Your Question/Preference</Label>
              <Input
                id="user-query-input"
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="e.g., 'Vegan options?', 'Nutritional info for Salmon dish?'"
                className="mt-1 text-base"
                aria-required="true"
              />
            </div>
            <Button type="submit" className="w-full text-lg py-3" disabled={isLoading || !imageDataUrl}>
              {isLoading ? (
                <>
                  <LoadingSpinner size={20} className="mr-2" />
                  Analyzing Menu...
                </>
              ) : (
                'Analyze Menu 🧐'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && !analysisResult && (
        <div className="text-center py-8">
          <LoadingSpinner size={48} />
          <p className="mt-4 text-lg text-muted-foreground">Our culinary detective is examining the menu...</p>
        </div>
      )}

      {analysisResult && (
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
            Menu Insights:
          </h2>
          {analysisResult.summary && (
            <Card className="bg-secondary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Lightbulb className="w-5 h-5" />
                  Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{analysisResult.summary}</p>
              </CardContent>
            </Card>
          )}

          {analysisResult.analyzedItems.length > 0 ? (
            <div className="space-y-4">
              {analysisResult.analyzedItems.map((item, index) => (
                <Card key={index} className={item.isMatch === false ? "opacity-70 border-dashed" : ""}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span>{item.dishName}</span>
                      {item.price && (
                        <BadgeDollarSign className="w-5 h-5 text-green-600 ml-2 flex-shrink-0" title={`Price: ${item.price}`} />
                      )}
                    </CardTitle>
                    {item.description && <CardDescription>{item.description}</CardDescription>}
                  </CardHeader>
                  
                  {item.details && (
                    <CardContent className="pb-2">
                      <p className="text-sm flex items-start gap-2"> 
                        <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> 
                        {item.details}
                      </p>
                    </CardContent>
                  )}

                  {item.nutritionalInfo && (
                    <CardContent className="pt-3 pb-4 border-t mt-3">
                      <h4 className="text-sm font-semibold mb-2 text-primary flex items-center gap-1.5">
                        <Beef className="w-4 h-4"/> Estimated Nutritional Information
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 text-xs">
                        {item.nutritionalInfo.calories && <p><strong>Calories:</strong> {item.nutritionalInfo.calories}</p>}
                        {item.nutritionalInfo.protein && <p><strong>Protein:</strong> {item.nutritionalInfo.protein}</p>}
                        {item.nutritionalInfo.carbohydrates && <p><strong>Carbs:</strong> {item.nutritionalInfo.carbohydrates}</p>}
                        {item.nutritionalInfo.fats && <p><strong>Fats:</strong> {item.nutritionalInfo.fats}</p>}
                        {item.nutritionalInfo.isVegan && (
                            <p className="flex items-center gap-1">
                                <Leaf className="w-3 h-3"/>
                                <strong>Vegan:</strong> {item.nutritionalInfo.isVegan}
                            </p>
                        )}
                        {item.nutritionalInfo.isGlutenFree && (
                            <p className="flex items-center gap-1">
                                <WheatOff className="w-3 h-3"/>
                                <strong>Gluten-Free:</strong> {item.nutritionalInfo.isGlutenFree}
                            </p>
                        )}
                        {item.nutritionalInfo.isLactoseFree && (
                            <p className="flex items-center gap-1">
                                <MilkOff className="w-3 h-3"/>
                                <strong>Lactose-Free:</strong> {item.nutritionalInfo.isLactoseFree}
                            </p>
                        )}
                      </div>
                      {item.nutritionalInfo.commonAllergens && item.nutritionalInfo.commonAllergens.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs"><strong>Common Allergens:</strong> {item.nutritionalInfo.commonAllergens.join(', ')}</p>
                        </div>
                      )}
                       <p className="text-xs italic text-muted-foreground mt-2">
                        Note: This nutritional information is an estimate if not explicitly stated on the menu.
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          ) : (
             !isLoading && analysisResult && 
            <p className="text-center text-muted-foreground py-6">
              No specific items matched your query, or the menu content was unclear. Try rephrasing or a different menu image.
            </p>
          )}
          
          {analysisResult.extractedText && (
            <details className="mt-6">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-primary">View raw text extracted from menu (for debugging)</summary>
              <pre className="mt-2 p-4 bg-muted rounded-md text-xs whitespace-pre-wrap overflow-x-auto">
                {analysisResult.extractedText}
              </pre>
            </details>
          )}
        </section>
      )}
    </div>
  );
}
