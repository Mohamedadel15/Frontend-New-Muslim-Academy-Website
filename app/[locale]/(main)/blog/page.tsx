import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { BlogList } from '@/components/blog/BlogList';
import { blogPosts } from '@/lib/mock-data/blog';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Blog' };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('blog.hero');

  return (
    <>
      <PageHero
        eyebrow="Read"
        title={t('title')}
        subtitle={t('subtitle')}
        breadcrumb={[{ href: '/blog', label: 'Blog' }]}
      />
      <BlogList posts={blogPosts} />
    </>
  );
}
