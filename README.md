# RecipeSage - Your Culinary Companion

RecipeSage is a modern web application built with Next.js that uses AI to generate, discover, and analyze recipes. The app helps users create delicious meals based on the ingredients they have on hand, taking into account dietary preferences and restrictions.

## ✨ Features

- **Recipe Generation**: Generate custom recipes based on available ingredients, cuisine preferences, and dietary restrictions
- **Recipe Categories**: Browse recipes by categories (Appetizer, Main Course, Dessert, etc.)
- **Menu Analysis**: Analyze restaurant menus to find dishes that match your dietary needs
- **Dish Analysis**: Get nutritional information about dishes
- **Recipe Search**: Find recipes matching specific criteria
- **Favorites**: Save your favorite recipes for quick access
- **Blog**: Read articles about cooking and nutrition

## 🚀 Tech Stack

- **Framework**: Next.js 15.2.3
- **Language**: TypeScript
- **UI Components**: Radix UI & Shadcn UI
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **AI Integration**: Google Gemini via Genkit
- **State Management**: React Context API
- **Data Fetching**: TanStack Query

## 📋 Project Structure

```
src/
├── ai/                  # AI integration with Genkit
│   └── flows/           # AI flows for recipe generation and analysis
├── app/                 # Next.js app router pages
├── components/          # UI components
│   ├── layout/          # Layout components (Header, Footer, etc.)
│   ├── recipes/         # Recipe-related components
│   ├── shared/          # Shared components
│   └── ui/              # UI library components
├── content/             # Static content
├── contexts/            # React context providers
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── types/               # TypeScript type definitions
```

## 🛠️ Setup and Development

### Prerequisites

- Node.js (>= 18.x)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Development

Run the development server:

```
npm run dev
```

This will start the Next.js development server on port 9002.

### AI Development

To develop AI features:

```
npm run genkit:dev
```

To watch for changes in AI flows:

```
npm run genkit:watch
```

### Production Build

Build for production:

```
npm run build
```

Start the production server:

```
npm run start
```

## 🧪 Quality Assurance

- Type checking:
  ```
  npm run typecheck
  ```

- Linting:
  ```
  npm run lint
  ```

## 🔄 API Flows

### Recipe Generation

1. User submits ingredients, cuisine preference, and dietary restrictions
2. AI generates a recipe with title, ingredients list, instructions, and an image
3. Recipe is displayed and added to the user's session history

### Menu Analysis

1. User uploads a photo of a restaurant menu
2. AI analyzes the menu and extracts dish information
3. User can filter dishes based on dietary preferences
4. Nutritional information is provided for each dish

## 🎨 UI Components

The application uses a component-based architecture with Shadcn UI and Radix UI primitives, styled with Tailwind CSS. Key components include:

- Recipe generation form
- Recipe display
- Category filters
- Navigation
- Dish analysis results
- Menu analyzer

## 📱 Responsive Design

The application is fully responsive with mobile-first design principles:

- Responsive navigation with mobile menu
- Adaptive layouts for different screen sizes
- Touch-friendly interface

## 🚀 Deployment

### Deploying to Cloudflare Pages

This application is configured to be deployed on Cloudflare Pages:

1. Push your code to a GitHub repository
2. Connect your repository to Cloudflare Pages
3. Configure the build settings:
   - Build command: `npm run build:cloudflare`
   - Build output directory: `.next`
   - Node.js version: `20.x`
   - Environment variables:
     - `NODE_OPTIONS`: `--import=genkit/auto-register`

#### Resolving Common Deployment Issues

If you encounter errors with client vs. server components:
- Ensure that pages with `generateStaticParams()` do not have the `"use client"` directive
- Split client and server concerns into separate components
- Use the proper Next.js patterns for mixing client and server components

## 🔮 Future Enhancements

- User authentication and profiles
- Save recipes to a database
- Share recipes with friends
- Meal planning functionality
- Grocery list generation
- Enhanced diet-specific recipe generation

## 📄 License

[Add your license information here]
