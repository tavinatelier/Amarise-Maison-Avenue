import { RevealSection } from "@/components/common/RevealSection";

interface Ingredient {
  name: string;
  origin: string;
  benefit: string;
}

interface ProductIngredientsProps {
  ingredients: Ingredient[];
  philosophy?: string;
}

export const ProductIngredients = ({ ingredients, philosophy }: ProductIngredientsProps) => {
  return (
    <section className="section-luxury-sm bg-muted/30">
      <div className="container-editorial">
        <RevealSection className="text-center mb-12">
          <p className="text-caption mb-4">Ingredients</p>
          <h2 className="font-serif text-2xl md:text-3xl">Crafted with Intention</h2>
          {philosophy && (
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {philosophy}
            </p>
          )}
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {ingredients.map((ingredient, index) => (
            <RevealSection key={ingredient.name} delay={index * 0.1}>
              <div className="text-center">
                <div className="divider-luxury mb-6" />
                <h3 className="font-serif text-lg md:text-xl mb-2">
                  {ingredient.name}
                </h3>
                <p className="text-caption text-accent mb-3">{ingredient.origin}</p>
                <p className="text-sm text-muted-foreground">{ingredient.benefit}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};
