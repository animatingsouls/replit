import { Layout } from "@/components/layout";

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-black mb-12 text-center text-primary">Our Story</h1>
        
        <div className="prose prose-lg mx-auto text-muted-foreground space-y-8 font-bold leading-relaxed">
          <p className="text-2xl text-foreground font-black text-center mb-12">
            This journey didn’t begin as a business. It began with a child and a book.
          </p>

          <p>
            Hi, I’m Archana. For over 13 years, my world revolved around graphic design and marketing communication. Deadlines, pixels, brand stories. I loved the craft. Then life quietly changed shape.
          </p>
          
          <p>
            When I stepped away from my IT career for maternity, I didn’t plan to start a business. I simply wanted to spend meaningful time with my son. Like many parents, I noticed something unsettling. Screens were everywhere. Attention spans were shrinking. Physical books were slowly disappearing from daily life.
          </p>

          <p>
            What started as a personal effort to introduce my son to the joy of reading became something bigger than I ever expected.
          </p>

          <p>
            I began collecting and sharing pre-loved children’s books. Stories that had already been loved once, now ready to spark imagination again. Page by page, something beautiful unfolded. Parents began reaching out. Children started asking for books. Reading became less of a task and more of a shared ritual.
          </p>

          <p className="text-2xl text-primary font-black italic text-center py-8">
            That’s how Animating Souls was born.
          </p>

          <p>
            The name has a story of its own. As an animator at heart, I’ve always believed stories have the power to bring ideas, emotions, and worlds to life. “AS” also stands for <strong>Archana & Swaminathan</strong>, and together with my husband, this journey became a family-led mission rather than just a business.
          </p>

          <p>
            Today, with over three years of experience, Animating Souls has grown many folds. Not just in numbers, but in purpose.
          </p>

          <p>
            Our goal is simple. Encourage children to read. Help parents reconnect with their kids beyond screens. Make books accessible, affordable, and joyful. And remind families that imagination still matters.
          </p>

          <p>
            Every pre-loved book here carries a past and promises a new beginning. If it finds its way into your child’s hands, our story has done its job.
          </p>

          <p className="text-3xl text-primary font-black text-center pt-12">
            Welcome to Animating Souls. <br/>
            <span className="text-xl text-muted-foreground">Where stories live on.</span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
