"use client";

import { useState } from 'react';
import { analyzeRecipeImage, type AnalyzeRecipeImageInput, type AnalyzeRecipeImageOutput } from '@/ai/flows/analyze-recipe-image';
import { ImageUploader } from '@/components/shared/ImageUploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import type { AnalyzedDishResult, FullAnalyzedDishResult } from '@/types';
import { ScanEye, Lightbulb, Salad, BarChart3, Zap, Info } from 'lucide-react';

export default function AnalyzeDishPage() {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<FullAnalyzedDishResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (dataUrl: string | null) => {
    setImageDataUrl(dataUrl);
    setAnalysisResult(null); // Clear previous results when new image is uploaded or cleared
  };

  const handleAnalyzeImage = async () => {
    if (!imageDataUrl) {
      toast({
        title: 'No Image',
        description: 'Please upload an image of a dish to analyze.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const input: AnalyzeRecipeImageInput = { photoDataUri: imageDataUrl };
      const result: AnalyzeRecipeImageOutput = await analyzeRecipeImage(input);
      
      const fullResult: FullAnalyzedDishResult = {
        dishName: result.dishName || "Dish Name Not Identified",
        suggestedRecipes: result.suggestedRecipes || [],
        suggestedIngredients: result.suggestedIngredients || [],
        calories: result.calories || "N/A",
        protein: result.protein || "N/A",
        vitamins: result.vitamins || [],
        servingSize: result.servingSize || "N/A",
      };
      setAnalysisResult(fullResult);
      toast({
        title: 'Analysis Complete!',
        description: 'Check out the dish details, recipe and ingredient suggestions below.',
      });
    } catch (error) {
      console.error('Image analysis error:', error);
      toast({
        title: 'Analysis Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred during analysis.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <div className="text-center">
        <ScanEye className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Analyze Your Dish</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Upload a photo of a dish, and our system will provide nutritional insights, potential recipes, and ingredients.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Upload Dish Photo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ImageUploader onImageUpload={handleImageUpload} aspectRatio="16/9" />
          <Button
            onClick={handleAnalyzeImage}
            disabled={isLoading || !imageDataUrl}
            className="w-full text-lg py-3"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size={20} className="mr-2" />
                Analyzing...
              </>
            ) : (
              'Analyze Image 🔍'
            )}
          </Button>
        </CardContent>
      </Card>

      {analysisResult && (
        <div className="space-y-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                Dish Analysis: {analysisResult.dishName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <p><strong className="font-semibold text-primary">Serving Size:</strong> {analysisResult.servingSize}</p>
                <p><strong className="font-semibold text-primary">Calories:</strong> {analysisResult.calories}</p>
                <p><strong className="font-semibold text-primary">Protein:</strong> {analysisResult.protein}</p>
              </div>
              {analysisResult.vitamins && analysisResult.vitamins.length > 0 && (
                <div>
                  <strong className="font-semibold text-primary">Key Vitamins:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1 space-y-0.5">
                    {analysisResult.vitamins.map((vitamin, index) => (
                      <li key={index}>{vitamin}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-primary" />
                  Suggested Recipes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analysisResult.suggestedRecipes.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {analysisResult.suggestedRecipes.map((recipe, index) => (
                      <li key={index}>{recipe}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No specific recipe suggestions at the moment.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Salad className="w-6 h-6 text-primary" />
                  Suggested Ingredients
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analysisResult.suggestedIngredients.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {analysisResult.suggestedIngredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No specific ingredient suggestions at the moment.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
