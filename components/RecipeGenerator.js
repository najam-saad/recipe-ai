import { useState } from "react";

export default function RecipeGenerator() {
  const [input, setInput] = useState("");
  const [recipe, setRecipe] = useState("");
  const [type, setType] = useState("ingredients");

  const generateRecipe = async () => {
    const res = await fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userInput: input, type }),
    });
    const data = await res.json();
    setRecipe(data.recipe);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">AI Recipe Generator</h2>
      <div className="mt-4">
        <select className="border p-2" onChange={(e) => setType(e.target.value)}>
          <option value="ingredients">Enter Ingredients</option>
          <option value="recipe">Enter Recipe Name</option>
        </select>
        <input
          className="border p-2 w-full mt-2"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter here..."
        />
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={generateRecipe}
        >
          Generate Recipe
        </button>
      </div>
      {recipe && <p className="mt-4 bg-gray-100 p-4">{recipe}</p>}
    </div>
  );
} 