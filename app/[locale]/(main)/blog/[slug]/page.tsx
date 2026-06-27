import { notFound } from 'next/navigation';
import Image from 'next/image';
import { setRequestLocale, getLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Twitter, Facebook, Send, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/animations/FadeIn';
import { PageHero } from '@/components/shared/PageHero';
import { Link } from '@/lib/navigation';
import { blogPosts, getPost } from '@/lib/mock-data/blog';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const post = getPost(slug);
  if (!post) notFound();
  const currentLocale = await getLocale();
  const isAr = currentLocale === 'ar';

  const title = isAr && post.titleAr ? post.titleAr : post.title;
  const content = isAr && post.contentAr ? post.contentAr : post.content;

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const paragraphs = content
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={title}
        breadcrumb={[
          { href: '/blog', label: isAr ? 'المدونة' : 'Blog' },
          { href: `/blog/${post.slug}`, label: title },
        ]}
      />

      <article className="container-pad pb-24">
        <FadeIn>
          <div className="relative mx-auto max-w-4xl aspect-[16/9] overflow-hidden rounded-3xl border border-border/60 shadow-elevated">
            <Image
              src={post.coverImage}
              alt={title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="flex items-center gap-4">
              <Avatar className="size-12">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  {formatDate(post.publishedAt, currentLocale)}
                  <span>·</span>
                  <Clock className="size-3" />
                  {isAr ? `${post.readMinutes} دقائق قراءة` : `${post.readMinutes} min read`}
                </p>
              </div>
              <Badge variant="default" className="ml-auto">
                {post.category}
              </Badge>
            </div>

            <div className="prose mt-12 space-y-6 text-base leading-[1.85] text-foreground/90">
              {paragraphs.map((para, i) => {
                if (para.startsWith('## ')) {
                  return (
                    <h2 key={i} className="font-display text-2xl mt-12 mb-3">
                      {para.replace('## ', '')}
                    </h2>
                  );
                }
                if (para.startsWith('- ')) {
                  const items = para.split('\n').map((l) => l.replace(/^- /, ''));
                  return (
                    <ul key={i} className="ml-6 list-disc space-y-2 text-muted-foreground">
                      {items.map((it, j) => (
                        <li key={j}>{it}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="text-foreground/85">
                    {para}
                  </p>
                );
              })}
            </div>

            <div className="mt-16 flex items-center justify-between border-y border-border/60 py-6">
              <p className="text-sm font-medium">{isAr ? 'شارك هذا المقال' : 'Share this article'}</p>
              <div className="flex gap-2">
                {[
                  { Icon: Twitter, label: 'Twitter' },
                  { Icon: Facebook, label: 'Facebook' },
                  { Icon: Send, label: 'WhatsApp' },
                ].map(({ Icon, label }) => (
                  <button
                    key={label}
                    aria-label={`Share on ${label}`}
                    className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="size-4" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-12 rounded-3xl border border-border/60 bg-card p-6">
              <div className="flex items-start gap-4">
                <Avatar className="size-16">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-display text-lg">{post.author.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{post.author.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {related.length > 0 && (
          <FadeIn className="mx-auto mt-24 max-w-5xl">
            <h2 className="font-display text-3xl mb-8">{isAr ? 'مقالات ذات صلة' : 'Related articles'}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => {
                const relTitle = isAr && p.titleAr ? p.titleAr : p.title;
                return (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}` as never}
                  className="group block overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-video">
                    <Image src={p.coverImage} alt={relTitle} fill sizes="33vw" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base leading-tight group-hover:text-accent">
                      {relTitle}
                    </h3>
                  </div>
                </Link>
                );
              })}
            </div>
          </FadeIn>
        )}
      </article>
    </>
  );
}
