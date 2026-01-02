import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Story</h1>
        
        <div className="prose prose-lg mx-auto text-muted-foreground space-y-6">
          <p className="lead text-xl text-foreground font-medium">
            It started with a simple observation: children outgrow books faster than they wear out clothes.
          </p>
          
          <p>
            As parents, we watched our bookshelves overflow with titles our kids had loved but moved on from. 
            We knew these stories still had magic left in them. They deserved to be read again, to spark 
            imagination in another child's mind.
          </p>
          
          <p>
            That's how <strong>Animating Souls Books</strong> was born.
          </p>

          <h3 className="text-2xl font-bold text-foreground mt-12 mb-4">Why Preloved?</h3>
          <p>
            Choosing preloved isn't just about saving money (though that helps!). It's a conscious choice 
            to reduce waste. Every book re-homed is one less book printed, and one less book in a landfill.
          </p>
          
          <h3 className="text-2xl font-bold text-foreground mt-12 mb-4">Our Promise</h3>
          <p>
                        Quality Books: We inspect every book for wear and tear, and we only sell books in good condition.
          </p>
        </div>
      </div>
    </Layout>
  );
}
