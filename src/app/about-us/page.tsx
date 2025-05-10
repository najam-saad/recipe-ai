"use client";

import { Users, Lightbulb, ChefHat } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-12">
      <header className="text-center py-12">
        <ChefHat className="w-24 h-24 text-primary mx-auto mb-6" />
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">About RecipeSage</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the story behind RecipeSage and our passion for making cooking accessible and enjoyable for everyone.
        </p>
      </header>

      <section className="bg-card p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-primary">Our Mission</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Lightbulb className="w-16 h-16 text-accent mx-auto md:mx-0 mb-4" />
            <p className="text-lg leading-relaxed mb-4">
              At RecipeSage, our mission is to inspire culinary creativity and empower home cooks of all skill levels. We believe that everyone can create delicious meals with the right tools and guidance.
            </p>
            <p className="text-lg leading-relaxed">
              We aim to simplify recipe discovery, generation, and meal planning, making your time in the kitchen more enjoyable and less stressful. Whether you're looking for a quick weeknight dinner or an elaborate feast, RecipeSage is here to help.
            </p>
          </div>
          <div data-ai-hint="team collaboration">
            <img src="https://picsum.photos/600/400?random=1" alt="Team working on recipes" className="rounded-lg shadow-md aspect-video object-cover" />
          </div>
        </div>
      </section>

      <section className="text-center py-10">
        <h2 className="text-3xl font-semibold mb-6 text-primary">Why Choose RecipeSage?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <Users className="w-12 h-12 text-accent mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">User-Focused</h3>
            <p className="text-muted-foreground">Designed with your cooking needs in mind, from ingredient-based suggestions to dietary filters.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <Lightbulb className="w-12 h-12 text-accent mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Innovative Features</h3>
            <p className="text-muted-foreground">Leveraging smart technology to provide unique recipe ideas and meal solutions.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <ChefHat className="w-12 h-12 text-accent mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Passion for Food</h3>
            <p className="text-muted-foreground">We love food as much as you do, and we're dedicated to helping you explore new flavors.</p>
          </div>
        </div>
      </section>

      <section className="bg-primary/10 p-8 rounded-xl text-center">
        <h2 className="text-3xl font-semibold mb-4">Join Our Culinary Journey!</h2>
        <p className="text-lg text-foreground/80 mb-6 max-w-xl mx-auto">
          Start exploring thousands of recipes, generate your own, and become part of the RecipeSage community today.
        </p>
        {/* You could add a Call to Action button here if needed */}
      </section>
    </div>
  );
}
