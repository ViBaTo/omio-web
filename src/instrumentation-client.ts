import posthog from 'posthog-js'
import { POSTHOG_PROXY_PATH, POSTHOG_UI_HOST } from '@/lib/posthog-proxy'

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
const isCms =
  typeof window !== 'undefined' &&
  window.location.pathname.startsWith('/keystatic')

if (token && !isCms) {
  posthog.init(token, {
    api_host: POSTHOG_PROXY_PATH,
    ui_host: POSTHOG_UI_HOST,
    defaults: '2026-05-30',
    // Sin login en la web pública: no crear un "person" por cada anónimo.
    person_profiles: 'identified_only',
    // El pageview lo dispara PostHogPageView (App Router + next-intl).
    capture_pageview: false,
    capture_pageleave: true,
    capture_exceptions: true,
    capture_heatmaps: true,
    capture_performance: true,
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: true,
    },
    loaded: (ph) => {
      ph.register({
        locale: document.documentElement.lang,
      })
    },
  })
}
