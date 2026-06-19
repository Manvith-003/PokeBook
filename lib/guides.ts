export interface Guide {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: "Beginner" | "Competitive" | "Lore" | "Mechanics";
  readTime: string;
}

export const guides: Guide[] = [
  {
    id: "top-10-pokemon-for-beginners",
    title: "Top 10 Pokémon for Beginners",
    excerpt: "Starting your Pokémon journey? Here are the top 10 best Pokémon to catch early on to build a strong foundation for your team.",
    category: "Beginner",
    readTime: "5 min read",
    content: `
Starting a new Pokémon journey can be daunting, but choosing the right early-game Pokémon makes a massive difference. Here are the top 10 Pokémon every beginner should look out for:

## 1. Bulbasaur
If you're playing in the Kanto region, Bulbasaur is statistically the best starter. Its Grass/Poison typing gives it a massive advantage against the first two gyms (Rock and Water).

## 2. Pidgey
Found on Route 1 in many games, Pidgey evolves into the reliable Pidgeot. It's a fantastic Flying-type that can carry you through the mid-game.

## 3. Magikarp
Yes, it's useless at first. But if you have the patience to level it to 20, you are rewarded with Gyarados, one of the most powerful and versatile Pokémon in existence.

## 4. Gastly
A Ghost-type is essential for dealing with Normal and Fighting types. Gastly, found early in games like Red/Blue, evolves into the incredibly fast and powerful Gengar.

## 5. Abra
If you can catch one before it Teleports away, Abra evolves into Kadabra (and Alakazam), which boasts some of the highest Special Attack and Speed stats in the early generations.

## 6. Nidoran (Male/Female)
These early-route encounters can evolve into their final stages (Nidoking/Nidoqueen) extremely early if you find a Moon Stone, giving you a fully evolved powerhouse before the third gym.

## 7. Mareep
In the Johto region, Mareep is an Electric-type powerhouse that evolves into Ampharos. It's bulky, hits hard, and is vital for taking out Water and Flying types.

## 8. Starly
The Sinnoh region's early bird is arguably the best regional bird. Its final evolution, Staraptor, learns Close Combat, giving it incredible type coverage.

## 9. Ralts
A rare early encounter in Hoenn, Ralts evolves into the formidable Gardevoir or Gallade, offering incredible Psychic (and Fairy/Fighting) coverage.

## 10. Magnemite
Steel is the best defensive typing in the game. Catching an early Magnemite provides a fantastic pivot that resists a massive number of types.
    `
  },
  {
    id: "type-matchup-guide",
    title: "The Ultimate Type Matchup Guide",
    excerpt: "Master the Pokémon type chart. Learn the best offensive and defensive typings to outsmart your opponents in battle.",
    category: "Mechanics",
    readTime: "8 min read",
    content: `
Understanding the Pokémon Type Chart is the most critical skill for any trainer. With 18 different types, knowing what is super-effective, not very effective, or completely immune can win or lose a battle.

## Defensive Titans
The best defensive type in the game is **Steel**. It resists a staggering 10 types and is completely immune to Poison. Pairing Steel with a type that covers its weaknesses (Fighting, Ground, Fire) creates a nearly unbreakable wall. Examples include Skarmory (Steel/Flying) which is immune to Ground.

Another fantastic defensive type is **Fairy**, which is immune to Dragon-type attacks and resists Bug, Dark, and Fighting.

## Offensive Powerhouses
Offensively, **Ground** and **Fighting** are king. 
- Ground-type attacks hit 5 different types for super-effective damage: Poison, Rock, Steel, Fire, and Electric.
- Fighting-type attacks also hit 5 types: Normal, Rock, Steel, Ice, and Dark.

If you have a Pokémon that can learn both a Ground and a Fighting move, you can hit a massive portion of the Pokédex for super-effective damage.

## Immunities to Exploit
Always remember the golden immunities:
- **Flying** is immune to **Ground**
- **Ghost** is immune to **Normal** and **Fighting**
- **Normal** is immune to **Ghost**
- **Dark** is immune to **Psychic**
- **Steel** is immune to **Poison**
- **Fairy** is immune to **Dragon**

Switching a Pokémon into an attack it is immune to gives you a free turn to set up or attack!
    `
  },
  {
    id: "how-evolution-works",
    title: "How Pokémon Evolution Works",
    excerpt: "From Leveling up to Friendship and Evolution Stones, discover all the unique methods Pokémon use to evolve.",
    category: "Mechanics",
    readTime: "4 min read",
    content: `
Evolution is one of the core pillars of the Pokémon franchise. While most Pokémon evolve simply by gaining experience, others require highly specific, sometimes bizarre conditions.

## 1. Level-Up Evolution
The most common method. When a Pokémon reaches a specific level, it evolves. For example, Charmander evolves into Charmeleon at level 16.

## 2. Item Evolution (Stones)
Some Pokémon require a specific elemental stone to evolve. For example, Pikachu requires a Thunder Stone to evolve into Raichu, and Eevee requires a Water Stone to become Vaporeon.

## 3. Trade Evolution
Certain Pokémon will only evolve when traded to another player. Haunter, Kadabra, Machoke, and Graveler are the classic examples. Some even require holding a specific item while being traded, like Scyther holding a Metal Coat to become Scizor.

## 4. Friendship/Happiness
A hidden mechanic where a Pokémon evolves only when it trusts its trainer enough. You increase friendship by walking with them, leveling them up, and giving them vitamins. Examples include Golbat evolving into Crobat, or Pichu evolving into Pikachu.

## 5. Location-Based Evolution
Some Pokémon must be leveled up in a specific location. Eevee traditionally evolved into Leafeon only when leveled up near a "Moss Rock", and into Glaceon near an "Ice Rock".

## 6. Time-Based Evolution
Some Pokémon only evolve during a specific time of day. Eevee evolves into Espeon during the day (with high friendship) and Umbreon at night.

Understanding these mechanics is key to completing your Pokédex!
    `
  }
];

export function getGuideById(id: string): Guide | undefined {
  return guides.find(g => g.id === id);
}

export function getAllGuides(): Guide[] {
  return guides;
}
