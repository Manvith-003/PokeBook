import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Legal disclaimer and intellectual property notice for PokéBook.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-neutral dark:prose-invert">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Disclaimer</h1>
      <p className="text-sm text-muted-foreground mb-10">Last Updated: {new Date().toLocaleDateString()}</p>

      <div className="bg-muted p-6 rounded-lg border-l-4 border-primary mb-10">
        <p className="font-semibold m-0 text-lg">
          PokéBook is an unofficial, non-commercial, open-source fan project and is NOT affiliated with, endorsed, 
          or supported by Nintendo, Creatures Inc., or GAME FREAK inc. in any way.
        </p>
      </div>

      <div className="leading-relaxed space-y-6">
        <h2 className="text-2xl font-semibold mt-10 mb-4">1. Intellectual Property Notice</h2>
        <p>
          Pokémon, Pokémon character names, Nintendo Switch, Nintendo 3DS, Nintendo DS, Wii, Wii U, and Game Boy are trademarks of Nintendo. 
          All related characters, artwork, and media are copyright © 1995-{new Date().getFullYear()} Nintendo, Creatures Inc., and GAME FREAK inc.
        </p>
        <p>
          PokéBook claims no ownership or rights to any of the Pokémon properties or media displayed on this site. 
          The database and the website's original source code are created by the community. Any copyrighted material is included under the principles of "Fair Use".
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">2. Fair Use Rationale</h2>
        <p>
          The use of copyrighted Pokémon materials on PokéBook is believed to fall under the "Fair Use" clause of the United States Copyright Law 
          (Title 17 U.S.C. Section 107) for the following reasons:
        </p>
        <ul>
          <li><strong>Non-commercial and Educational:</strong> PokéBook is a free, ad-free, open-source educational resource designed to inform the community about game statistics and lore. We do not generate revenue from this site.</li>
          <li><strong>Nature of the Work:</strong> We use factual game data and low-resolution/optimized images that do not substitute or harm the market for the original games or merchandise.</li>
          <li><strong>Transformative Use:</strong> The raw data and media are compiled, re-organized, and presented in a novel, interactive, and highly searchable digital format that adds new value for players researching game mechanics.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">3. Data Accuracy and Availability</h2>
        <p>
          The information and statistics provided on PokéBook are primarily sourced from community-driven databases, notably the PokéAPI. 
          While we strive for the highest level of accuracy and completeness, we make no representations or warranties of any kind, express or implied, 
          about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information contained on the website.
        </p>
        <p>
          Any reliance you place on such information is therefore strictly at your own risk. We reserve the right to make additions, deletions, 
          or modifications to the contents on the Service at any time without prior notice.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">4. External Links Disclaimer</h2>
        <p>
          PokéBook may contain links to external websites that are not provided or maintained by or in any way affiliated with us. 
          Please note that PokéBook does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">5. Takedown Requests</h2>
        <p>
          If you are a copyright or trademark owner (or an authorized representative) and believe that any content hosted on PokéBook infringes upon your rights, 
          please contact us immediately through our official Contact Us page. We will respect all valid DMCA takedown requests and promptly remove the infringing material.
        </p>
      </div>
    </div>
  );
}
