import React from "react";

export default function ClaudeRecipe({ ingredients }) {
  const [recipe, setRecipe] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    function generateRecipe(ingredients) {
      if (!ingredients || ingredients.length === 0) {
        return "No ingredients provided.";
      }

      // Simple logic (you can improve this later)
      const baseRecipe = `
🍽️ Simple Recipe Idea:

Ingredients:
${ingredients.map(item => `- ${item}`).join("\n")}

Steps:
1. Prepare all ingredients.
2. Heat a pan and add some oil.
3. Add ingredients one by one and cook well.
4. Add salt and spices as needed.
5. Cook for 10-15 minutes.

👨‍🍳 Tip: You can customize with your favorite spices!
      `;

      return baseRecipe;
    }

    setLoading(true);

    // Simulate delay (optional)
    setTimeout(() => {
      const result = generateRecipe(ingredients);
      setRecipe(result);
      setLoading(false);
    }, 1000);

  }, [ingredients]);

  return (
    <section>
      <h2>Chef Claude Recommends:</h2>
      <article className="suggested-recipe-container" aria-live="polite">
        {loading ? <p>Loading recipe...</p> : <pre>{recipe}</pre>}
      </article>
    </section>
  );
}
