import { MetadataRoute } from 'next';
import { fetchPokemonList } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  try {
    // Fetch the first 151 pokemon for the sitemap to ensure good initial indexing
    const data = await fetchPokemonList(151, 0);
    
    const pokemonEntries = data.results.map((pokemon) => ({
      url: `${baseUrl}/pokemon/${pokemon.name}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
    
    return [...sitemapEntries, ...pokemonEntries];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return sitemapEntries;
  }
}
