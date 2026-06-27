'use client';

import { useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import type { FAQItem } from '@/types/user';

const CATS: FAQItem['category'][] = ['general', 'courses', 'technical', 'community', 'mentorship'];

export function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const t = useTranslations('faq');
  const tCat = useTranslations('faq.categories');
  const isAr = useLocale() === 'ar';
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return faqs.filter((f) => {
      const matchCat = filter === 'all' || f.category === filter;
      const matchQ =
        !query ||
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        (f.questionAr?.toLowerCase().includes(q) ?? false) ||
        (f.answerAr?.toLowerCase().includes(q) ?? false);
      return matchCat && matchQ;
    });
  }, [faqs, filter, query]);

  return (
    <section className="container-pad pb-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 space-y-6">
          <div className="relative">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder={t('search')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="ps-11 h-14 text-base"
            />
          </div>

          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="flex-wrap">
              <TabsTrigger value="all">{isAr ? 'الكل' : 'All'}</TabsTrigger>
              {CATS.map((c) => (
                <TabsTrigger key={c} value={c}>
                  {tCat(c)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <Card>
          <CardContent className="p-2 sm:p-4">
            <Accordion type="single" collapsible>
              {filtered.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="px-4 text-start">
                    {isAr && item.questionAr ? item.questionAr : item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-base leading-relaxed">
                    {isAr && item.answerAr ? item.answerAr : item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-muted-foreground">{t('noResults')}</p>
        )}
      </div>
    </section>
  );
}
