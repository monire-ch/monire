---
enable: true # Control the visibility of this section across all pages where it is used
title: "Two services. One goal: helping your business grow."
subtitle: Pricing

heading: Need Something More Specific?
description: "We know every project is different. If you need support beyond the packages above, we’re happy to tailor a custom scope. We also collaborate with trusted partners in photography, social media, and copywriting, so everything can be coordinated in one place."

plans:
  enable: true
  list:
    # List of available plans. Ensure that these names are used consistently in other places where applicable.
    - selected: true
      label: "Web Design & Development" # Use this value exactly in all corresponding places below.
    - selected: false
      label: AI Automations # Use this value exactly in all corresponding places below.

list:
  # STARTER Plan
  - enable: true
    featured: false
    badge:
      enable: false
      label: Most Popular
    name: Starter
    description: "Ideal for: New businesses, coaches, freelancers, small consultancies."

    price:
      # Pricing details for each plan type.
      - type: "Web Design & Development" # Plan type (must match values in the 'plans' section above).
        prependValue: CHF
        value: 3500
        appendValue:
      - type: AI Automations # Plan type (must match values in the 'plans' section above).
        prependValue: CHF
        value: 24
        appendValue:

    features:
      - Up to 5 pages
      - Clean, professional visual style
      - Mobile-ready + fast loading
      - Contact form
      - Basic CMS for easy text/image updates
      - Essential on-page SEO (meta tags, sitemap, search-friendly structure)

    ctaBtn:
      enable: true
      label: Get started
      url: /contact/
      rel:
      target:

  # Advanced Plan
  - enable: true
    featured: true
    badge:
      enable: true
      label: Most Popular
    name: Advanced
    description: Best for SMEs, agencies, boutique firms, B2B services.

    price:
      # Pricing details for each plan type.
      - type: "Web Design & Development" # Plan type (must match values in the 'plans' section above).
        prependValue: CHF
        value: 6000
        appendValue:
      - type: AI Automations # Plan type (must match values in the 'plans' section above).
        prependValue: CHF
        value: 40
        appendValue:

    features:
      - Up to 10 pages
      - Custom visual design** + subtle animations
      - More flexible CMS structures (blogs, case studies, product/service lists)
      - SEO optimization focused on ranking (not just set-up)
      - Google Analytics with event tracking
      - Integration of 1-2 third-party tools (booking system, CRM form, etc.)
      - Support for 2 languages

    ctaBtn:
      enable: true
      label: Get started
      url: /contact/
      rel:
      target:

  # Premium Plan
  - enable: true
    featured: false
    badge:
      enable: false
      label: Most Popular
    name: Premium
    description: "Best for: growing firms, established brands, companies needing workflows & integrations."

    price:
      - type: "Web Design & Development" # Plan type (must match values in the 'plans' section above).
        prependValue: CHF
        value: 9000
        appendValue:
      - type: AI Automations # Plan type (must match values in the 'plans' section above).
        prependValue: CHF
        value: 60
        appendValue:

    features:
      - Unlimited pages
      - Full custom UX + UI layout planning
      - Advanced CMS
      - "Integrations with tools like: Newsletter, booking, calendar, live chat, client portal"
      - Comprehensive SEO strategy
      - Multi-language support

    ctaBtn:
      enable: true
      label: Get started
      url: /contact/
      rel:
      target:

# AI Automations Content block (NOT a pricing tier)
ai_automations:
  title: "AI Automations & Workflow Systems"
  subtitle: "We build custom automation systems that reduce manual, repetitive work and seamlessly connect the tools you already use. Pricing is defined individually after a short discovery call."
  ctas:
    - label: "Get started"
      variant: "primary"
      url: "/contact/"
    - label: "Latest case study"
      variant: "secondary"
      url: "/case-studies/expense-receipt-automation/"
---
