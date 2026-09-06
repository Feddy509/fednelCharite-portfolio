import { MetadataRoute } from 'next';

/**
 * ==============================================================================
 * FR: Générateur de Sitemap XML Dynamique pour Next.js App Router
 * EN: Dynamic XML Sitemap Generator for Next.js App Router
 * ==============================================================================
 * 
 * FR: Définit la structure des URLs du portfolio pour optimiser l'indexation SEO.
 * EN: Defines portfolio URL structure to optimize SEO search engine indexing.
 * 
 * @returns FR: Objet de configuration du Sitemap / EN: Sitemap configuration object
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fednelcharite.site'; 

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0, // FR: Page d'accueil prioritaire / EN: Main landing page priority
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8, // FR: Page à propos / EN: About section priority
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly', // FR: Mise à jour fréquente lors de nouveaux projets / EN: Frequent updates when adding projects
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly', // FR: Page de contact stable / EN: Stable contact page
      priority: 0.5,
    },
  ];
}