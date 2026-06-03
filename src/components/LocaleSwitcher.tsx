'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

interface LocaleSwitcherProps {
  textColor?: string;
}

export default function LocaleSwitcher({ textColor = '#002A3A' }: LocaleSwitcherProps) {
  const locale = useLocale();
  const t = useTranslations('localeSwitcher');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function changeLocale(nextLocale: string) {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale as (typeof routing.locales)[number] });
    });
  }

  return (
    <div
      className="flex items-center gap-1 font-ingeniero text-[13px] tracking-[0.2em]"
      role="group"
      aria-label={t('label')}
    >
      {routing.locales.map((loc, idx) => {
        const isActive = locale === loc;
        return (
          <span key={loc} className="flex items-center">
            {idx > 0 && (
              <span
                aria-hidden="true"
                className="mx-1.5 select-none"
                style={{ color: textColor, opacity: 0.3 }}
              >
                ·
              </span>
            )}
            <button
              type="button"
              onClick={() => changeLocale(loc)}
              disabled={isPending}
              className="uppercase transition-opacity duration-300 hover:opacity-100"
              style={{
                color: textColor,
                opacity: isActive ? 1 : 0.5,
                cursor: isActive ? 'default' : 'pointer',
              }}
              aria-current={isActive ? 'true' : undefined}
            >
              {t(loc as 'es' | 'en')}
            </button>
          </span>
        );
      })}
    </div>
  );
}
