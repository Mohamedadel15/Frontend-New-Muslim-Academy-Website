'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Search, Clock, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Link } from '@/lib/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { BLOG_CATEGORIES } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types/blog';

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations('blog');
  const tFilter = useTranslations('blog.filters');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return posts.filter((p) => {
      const matchCat = filter === 'all' || p.category === filter;
      const matchQ =
        !query ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        (p.titleAr ?? '').toLowerCase().includes(q) ||
        (p.excerptAr ?? '').toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [posts, filter, query]);

  return (
    <section className="container-pad pb-24">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder={t('search')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="ps-11"
          />
        </div>

        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList>
            {BLOG_CATEGORIES.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {tFilter(cat)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {filtered.map((post) => {
          const title = isAr && post.titleAr ? post.titleAr : post.title;
          const excerpt = isAr && post.excerptAr ? post.excerptAr : post.excerpt;
          return (
          <StaggerItem key={post.slug}>
            <Link
              href={`/blog/${post.slug}` as never}
              className="group block overflow-hidden rounded-3xl border border-border/60 bg-card shadow-subtle transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute left-4 top-4">
                  <Badge>{tFilter(post.category)}</Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl leading-tight group-hover:text-accent transition-colors">
                  {title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {t('readTime', { minutes: post.readMinutes })}
                    </span>
                    {post.commentCount !== undefined && (
                      <span className="flex items-center gap-1">
                        <MessageCircle className="size-3" />
                        {post.commentCount}
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {formatDate(post.publishedAt, locale)}
                </p>
              </div>
            </Link>
          </StaggerItem>
          );
        })}
      </StaggerContainer>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          {isAr ? 'لا توجد مقالات.' : 'No articles found.'}
        </p>
      )}
    </section>
  );
}
