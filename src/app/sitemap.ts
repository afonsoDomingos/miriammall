import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://miriammall.com';

  const routes = [
    '',
    '/sobre',
    '/espacos',
    '/lojas',
    '/restaurantes',
    '/promocoes',
    '/eventos',
    '/galeria',
    '/blog',
    '/contato',
    '/politica-de-cookies',
    '/politica-de-privacidade',
    '/termos-de-uso',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return routes;
}
