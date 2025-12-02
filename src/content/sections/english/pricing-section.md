---
enable: true # Control the visibility of this section across all pages where it is used
title: Pricing That **Makes Sense**

plans:
  enable: true
  list:
    # List of available plans. Ensure that these names are used consistently in other places where applicable.
    - selected: true
      label: Monthly # Use this value exactly in all corresponding places below.
    - selected: false
      label: Yearly # Use this value exactly in all corresponding places below.

list:
  # Basic Plan
  - enable: true
    featured: false
    badge:
      enable: false
      label: Most Popular
    name: Basic # Name of the pricing tier.
    description: Nostrud exercitation ullamco laboris nisi ut aliquip ex

    price:
      # Pricing details for each plan type.
      - type: Monthly # Plan type (must match values in the 'plans' section above).
        prependValue: $
        value: 12
        appendValue:
      - type: Yearly # Plan type (must match values in the 'plans' section above).
        prependValue: $
        value: 24
        appendValue:

    features:
      - Basic tracking of page views, events, and user properties
      - Real-time data visualization
      - Limited data export options **CSV**
      - 48-hour support response time

    usages:
      - type: Monthly # Plan type (must match values in the 'plans' section above).
        list:
          - label: Data Points
            value: 536
          - label: Traffic
            value: 100
      - type: Yearly # Plan type (must match values in the 'plans' section above).
        list:
          - label: Data Points
            value: 1203
          - label: Traffic
            value: 1000

    ctaBtn:
      enable: true
      label: Get Started
      url: /contact/
      rel:
      target:

  # Medium Plan
  - enable: true
    featured: true
    badge:
      enable: true
      label: Most Popular
    name: Starter # Name of the pricing tier.
    description: Nostrud exercitation ullamco laboris nisi ut aliquip ex

    price:
      # Pricing details for each plan type.
      - type: Monthly # Plan type (must match values in the 'plans' section above).
        prependValue: $
        value: 20
        appendValue:
      - type: Yearly # Plan type (must match values in the 'plans' section above).
        prependValue: $
        value: 40
        appendValue:

    features:
      - In-Depth Brand Positioning Workshop
      - Competitive Analysis Top 5 Competitors
      - Comprehensive Market Analysis
      - Customer Insights & Segmentation

    usages:
      - type: Monthly # Plan type (must match values in the 'plans' section above).
        list:
          - label: Data Points
            value: 754
          - label: Traffic
            value: 850
      - type: Yearly # Plan type (must match values in the 'plans' section above).
        list:
          - label: Data Points
            value: 1467
          - label: Traffic
            value: 1600

    ctaBtn:
      enable: true
      label: Get Started
      url: /contact/
      rel:
      target:

  # Pro Plan
  - enable: true
    featured: false
    badge:
      enable: false
      label: Most Popular
    name: Pro # Name of the pricing tier.
    description: Nostrud exercitation ullamco laboris nisi ut aliquip ex

    price:
      # Pricing details for each plan type.
      - type: Monthly # Plan type (must match values in the 'plans' section above).
        prependValue: $
        value: 30
        appendValue:
      - type: Yearly # Plan type (must match values in the 'plans' section above).
        prependValue: $
        value: 60
        appendValue:

    features:
      - Comprehensive Brand Positioning Strategy
      - Full Competitive Analysis
      - Advanced Market Analysis
      - In-Depth Customer Insights

    usages:
      - type: Monthly # Plan type (must match values in the 'plans' section above).
        list:
          - label: Data Points
            value: 976
          - label: Traffic
            value: 1200
      - type: Yearly # Plan type (must match values in the 'plans' section above).
        list:
          - label: Data Points
            value: 2045
          - label: Traffic
            value: 2600

    ctaBtn:
      enable: true
      label: Get Started
      url: /contact/
      rel:
      target:

# Pricing Comparison
comparison:
  - label: Features
    list:
      - value: Integrations
        included:
          - true # Free Plan
          - true # Starter Plan
          - true # Pro Plan
      - value: Shared links
        included:
          - true # Free Plan
          - true # Starter Plan
          - true # Pro Plan
      - value: Importing and exporting
        included:
          - true # Free Plan
          - true # Starter Plan
          - true # Pro Plan
      - value: Team members
        included:
          - false
          - Up to 20 users
          - Up to 50 users

  - label: Reporting
    list:
      - value: Advanced analytics
        included:
          - true # Free Plan
          - true # Starter Plan
          - true # Pro Plan
      - value: Basic reports
        included:
          - false # Free Plan
          - true # Starter Plan
          - true # Pro Plan
      - value: Professional reports
        included:
          - false # Free Plan
          - false # Starter Plan
          - true # Pro Plan
      - value: Custom report builder
        included:
          - false
          - false
          - true

  - label: Support
    list:
      - value: 24/7 online support
        included:
          - true # Free Plan
          - false # Starter Plan
          - false # Pro Plan
      - value: Quarterly product workshops
        included:
          - false # Free Plan
          - false # Starter Plan
          - true # Pro Plan
      - value: Priority phone support
        included:
          - false # Free Plan
          - false # Starter Plan
          - true # Pro Plan
      - value: 1:1 onboarding tour
        included:
          - false
          - false
          - true
---
