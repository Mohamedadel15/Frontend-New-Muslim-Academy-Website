import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ContentViewer } from '@/components/teachers/ContentViewer';
import { contentByTeacher, getContent, getTeacher } from '@/lib/mock-data/teachers';

export default async function ContentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; contentId: string }>;
}) {
  const { locale, slug, contentId } = await params;
  setRequestLocale(locale);

  const teacher = getTeacher(slug);
  const content = getContent(contentId);
  if (!teacher || !content) notFound();

  const related = contentByTeacher(slug).filter((c) => c.id !== contentId);
  return <ContentViewer teacher={teacher} content={content} related={related} />;
}
