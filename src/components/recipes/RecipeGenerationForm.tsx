"use client";

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { recipeCategories, type RecipeCategory } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const recipeFormSchema = z.object({
  ingredients: z.string().min(3, { message: "Please list at least one ingredient." }).max(500),
  cuisine: z.string().max(50).optional(),
  dietaryRestrictions: z.string().max(200).optional(),
  category: z.custom<RecipeCategory>((val) => recipeCategories.includes(val as RecipeCategory), {
    message: "Please select a valid category.",
  }),
});

type RecipeFormValues = z.infer<typeof recipeFormSchema>;

interface RecipeGenerationFormProps {
  onSubmit: (values: RecipeFormValues) => Promise<void>;
  isLoading: boolean;
}

export function RecipeGenerationForm({ onSubmit, isLoading }: RecipeGenerationFormProps) {
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      ingredients: '',
      cuisine: '',
      dietaryRestrictions: '',
      category: 'Main Course', // Default category
    },
  });

  const handleSubmit = async (values: RecipeFormValues) => {
    await onSubmit(values);
    // Optionally reset form: form.reset();
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">What's in your pantry?</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="ingredients-input">Ingredients (comma separated)</FormLabel>
                  <FormControl>
                    <Textarea
                      id="ingredients-input"
                      placeholder="e.g., chicken breast, broccoli, soy sauce, rice"
                      className="min-h-[100px] resize-y"
                      {...field}
                      aria-required="true"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="cuisine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="cuisine-input">Preferred Cuisine (optional)</FormLabel>
                    <FormControl>
                      <Input id="cuisine-input" placeholder="e.g., Italian, Mexican, Chinese" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="category-select">Recipe Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger id="category-select" aria-required="true">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {recipeCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="dietaryRestrictions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="dietary-input">Dietary Restrictions (optional)</FormLabel>
                  <FormControl>
                    <Input id="dietary-input" placeholder="e.g., vegetarian, gluten-free, nut-free" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full text-lg py-3" disabled={isLoading} aria-live="polite">
              {isLoading ? (
                <>
                  <LoadingSpinner size={20} className="mr-2" />
                  Generating Recipe...
                </>
              ) : (
                'Generate Recipe ✨'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
