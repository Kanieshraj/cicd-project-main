import React from "react";

export default function ClaudeRecipe({ ingredients }) {
  const [recipe, setRecipe] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    function generateRecipe(ingredients) {
      if (!ingredients || ingredients.length === 0) {
        return "No ingredients provided.";
      }

      const items = ingredients.map(i => i.toLowerCase());

      // 🧠 Ingredient classification
      const types = {
        protein: ["egg", "chicken", "paneer"],
        carb: ["rice", "maggi", "bread", "pasta", "noodles"],
        fat: ["ghee", "butter", "oil"],
        spice: ["chilli", "pepper", "garam masala"],
        sweet: ["sugar", "chocolate", "honey"],
        veg: ["onion", "tomato", "carrot", "beans", "capsicum"]
      };

      let detected = {
        protein: false,
        carb: false,
        fat: false,
        spice: false,
        sweet: false,
        veg: false
      };

      items.forEach(item => {
        Object.keys(types).forEach(type => {
          if (types[type].includes(item)) {
            detected[type] = true;
          }
        });
      });

      // 🍽️ Decide dish style
      let style = "Fusion Dish";

      if (detected.carb && detected.fat) style = "Comfort Bowl";
      if (detected.protein && detected.spice) style = "Spicy Delight";
      if (detected.sweet && detected.fat) style = "Sweet Treat";
      if (detected.carb && detected.protein) style = "Hearty Meal";

      const dishName = `${ingredients[0]} ${style}`;

      // 🔥 Generate steps dynamically
      let steps = [];

      steps.push(`Start by preparing: ${ingredients.join(", ")}.`);

      if (detected.fat) {
        steps.push("Heat a pan and add oil for flavor.");
      } else {
        steps.push("Heat a pan in medium flame.");
      }

      if (detected.veg) {
        steps.push("Sauté vegetables until soft and aromatic.");
      }

      if (detected.protein) {
        steps.push("Add protein ingredients and cook thoroughly.");
      }

      if (detected.carb) {
        steps.push("Add carbohydrate base like rice/noodles and mix well.");
      }

      steps.push("Add spices, salt, and seasoning to enhance taste.");

      if (detected.sweet) {
        steps.push("Balance flavors by adding a hint of sweetness.");
      }

      steps.push("Cook everything together until well combined.");
      steps.push("Serve hot and enjoy your unique creation!");

      // 👨‍🍳 Chef tips
      const tips = [
        "Try adding cheese for extra richness.",
        "A squeeze of lemon can enhance flavors.",
        "Garnish with fresh herbs for a premium touch.",
        "Roasting ingredients first can improve taste."
      ];

      const randomTip = tips[Math.floor(Math.random() * tips.length)];

      return `
🍽️ ${dishName}

Ingredients:
${ingredients.map(i => `- ${i}`).join("\n")}

Steps:
${steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

👨‍🍳 Chef Insight:
${randomTip}
      `;
    }

    setLoading(true);

    setTimeout(() => {
      const result = generateRecipe(ingredients);
      setRecipe(result);
      setLoading(false);
    }, 800);

  }, [ingredients]);

  return (
    <section style={styles.container}>
      <h2>👨‍🍳 Chef Suggestion:</h2>

      <article style={styles.card}>
        {loading ? (
          <p>Generating your recipe...</p>
        ) : (
          <pre style={styles.text}>{recipe}</pre>
        )}
      </article>
    </section>
  );
}

const styles = {
  container: {
    marginTop: "20px"
  },
  card: {
    background: "#f4f4f4",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "600px",
    margin: "auto",
    textAlign: "left"
  },
  text: {
    whiteSpace: "pre-wrap",
    fontFamily: "monospace"
  }
};
