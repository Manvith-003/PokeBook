import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about PokéBook, our mission, and the team behind the ultimate Pokémon database.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-neutral dark:prose-invert">
      <h1 className="text-4xl font-bold tracking-tight mb-8">About PokéBook</h1>
      
      <p className="text-lg leading-relaxed mb-8">
        Welcome to PokéBook, the premier destination for trainers, researchers, and Pokémon enthusiasts worldwide. 
        Born out of a deep-seated passion for the Pokémon universe, our platform is designed to be the most comprehensive, 
        user-friendly, and visually engaging digital encyclopedia available today.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-6">Our Mission</h2>
      <p className="leading-relaxed mb-6">
        Our mission is simple: to democratize Pokémon data. We believe that every trainer, whether a casual player 
        embarking on their first journey in the Kanto region or a seasoned competitive battler analyzing base stats 
        and hidden abilities, deserves access to accurate, well-organized, and lightning-fast information. 
        We strive to remove the friction from Pokémon research so you can focus on what matters most—enjoying the game.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-6">What We Offer</h2>
      <ul className="list-disc pl-6 mb-8 space-y-3">
        <li><strong>Comprehensive Database:</strong> Detailed entries for every known Pokémon, including base stats, evolutions, abilities, and type matchups.</li>
        <li><strong>Responsive Design:</strong> A seamless experience whether you are browsing on a desktop computer, a tablet, or a mobile phone on the go.</li>
        <li><strong>Lightning Fast Search:</strong> Instantaneous search capabilities to find exactly what you are looking for without delay.</li>
        <li><strong>Rich Media:</strong> High-quality artwork, sprites, and interactive visual elements to bring the Pokémon world to life.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-12 mb-6">Our Technology</h2>
      <p className="leading-relaxed mb-6">
        PokéBook is engineered using the cutting edge of modern web development. We leverage the power of <strong>Next.js</strong> for 
        server-side rendering and static generation, ensuring incredibly fast load times. Our interface is meticulously crafted 
        with <strong>Tailwind CSS</strong> to provide a beautiful, responsive, and accessible user experience. 
        Under the hood, we rely on the open-source <strong>PokéAPI</strong> to supply the vast amounts of data required to power our application.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-6">The Community</h2>
      <p className="leading-relaxed mb-6">
        PokéBook is built by fans, for fans. We recognize that the Pokémon community is one of the most dedicated and knowledgeable 
        in the gaming world. As an open-source initiative, we welcome contributions, suggestions, and feedback from trainers everywhere. 
        Together, we are continually refining and expanding our digital Pokédex to serve the needs of the community.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-6">Join Us on Our Journey</h2>
      <p className="leading-relaxed mb-8">
        We are constantly evolving, just like the Pokémon we document. Whether you are here to look up a specific type advantage 
        or to browse the extensive lore of Legendary Pokémon, we are thrilled to be part of your adventure. 
        Thank you for choosing PokéBook as your trusted guide.
      </p>
    </div>
  );
}
