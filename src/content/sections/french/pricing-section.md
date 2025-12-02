---
enable: true # Contrôle la visibilité de cette section sur toutes les pages où elle est utilisée
title: Tarifs qui **font sens**

plans:
  enable: true
  list:
    # Liste des plans disponibles. Assurez-vous de utiliser ces noms de manière cohérente dans les endroits où cela est applicable.
    - selected: true
      label: Mensuel # Utilisez cette valeur exactement dans tous les endroits correspondants ci-dessous.
    - selected: false
      label: Annuel # Utilisez cette valeur exactement dans tous les endroits correspondants ci-dessous.

list:
  # Plan de base
  - enable: true
    featured: false
    badge:
      enable: false
      label: Le plus populaire
    name: De base # Nom du plan de tarification.
    description: Nostrud exercitation ullamco laboris nisi ut aliquip ex

    price:
      # Détails des prix pour chaque type de plan.
      - type: Mensuel # Type de plan (doit correspondre aux valeurs dans la section "plans" ci-dessus).
        prependValue: $
        value: 10
        appendValue:
      - type: Annuel # Type de plan (doit correspondre aux valeurs dans la section "plans" ci-dessus).
        prependValue: $
        value: 20
        appendValue:

    features:
      - Suivi de base des vues de pages, des événements et des propriétés utilisateur
      - Visualisation des données en temps réel
      - Options d'exportation de données limitées **CSV**
      - Temps de réponse du support de 48 heures

    usages:
      - type: Mensuel # Type de plan (doit correspondre aux valeurs dans la section "plans" ci-dessus).
        list:
          - label: Points de données
            value: 536
          - label: Trafic
            value: 100
      - type: Annuel # Type de plan (doit correspondre aux valeurs dans la section "plans" ci-dessus).
        list:
          - label: Points de données
            value: 1203
          - label: Trafic
            value: 1000

    ctaBtn:
      enable: true
      label: Commencer
      url: /contact/
      rel:
      target:

  # Plan Medium
  - enable: true
    featured: true
    badge:
      enable: true
      label: Le plus populaire
    name: Démarrage # Nom du plan de tarification.
    description: Nostrud exercitation ullamco laboris nisi ut aliquip ex

    price:
      # Détails des prix pour chaque type de plan.
      - type: Mensuel # Type de plan (doit correspondre aux valeurs dans la section "plans" ci-dessus).
        prependValue: $
        value: 20
        appendValue:
      - type: Annuel # Type de plan (doit correspondre aux valeurs dans la section "plans" ci-dessus).
        prependValue: $
        value: 40
        appendValue:

    features:
      - Atelier de positionnement de marque en profondeur
      - Analyse de la concurrence (5 principaux concurrents)
      - Analyse de marché complète
      - Insights sur les clients et segmentation

    usages:
      - type: Mensuel # Type de plan (doit correspondre aux valeurs dans la section "plans" ci-dessus).
        list:
          - label: Points de données
            value: 754
          - label: Trafic
            value: 850
      - type: Annuel # Type de plan (doit correspondre aux valeurs dans la section "plans" ci-dessus).
        list:
          - label: Points de données
            value: 1467
          - label: Trafic
            value: 1600

    ctaBtn:
      enable: true
      label: Commencer
      url: /contact/
      rel:
      target:

  # Plan Pro
  - enable: true
    featured: false
    badge:
      enable: false
      label: Le plus populaire
    name: Pro # Nom du plan de tarification.
    description: Nostrud exercitation ullamco laboris nisi ut aliquip ex

    price:
      # Détails des prix pour chaque type de plan.
      - type: Mensuel # Type de plan (doit correspondre aux valeurs dans la section "plans" ci-dessus).
        prependValue: $
        value: 30
        appendValue:
      - type: Annuel # Type de plan (doit correspondre aux valeurs dans la section "plans" ci-dessus).
        prependValue: $
        value: 60
        appendValue:

    features:
      - Stratégie de positionnement de marque complète
      - Analyse de la concurrence complète
      - Analyse de marché avancée
      - Insights sur les clients approfondis

    usages:
      - type: Mensuel # Type de plan (doit correspondre aux valeurs dans la section "plans" ci-dessus).
        list:
          - label: Points de données
            value: 976
          - label: Trafic
            value: 1200
      - type: Annuel # Type de plan (doit correspondre aux valeurs dans la section "plans" ci-dessus).
        list:
          - label: Points de données
            value: 2045
          - label: Trafic
            value: 2600

    ctaBtn:
      enable: true
      label: Commencer
      url: /contact/
      rel:
      target:

# Comparaison des tarifs
comparison:
  - label: Fonctionnalités
    list:
      - value: Intégrations
        included:
          - true # Plan gratuit
          - true # Plan Démarrage
          - true # Plan Pro
      - value: Liens partagés
        included:
          - true # Plan gratuit
          - true # Plan Démarrage
          - true # Plan Pro
      - value: Importation et exportation
        included:
          - true # Plan gratuit
          - true # Plan Démarrage
          - true # Plan Pro
      - value: Membres de l'équipe
        included:
          - false
          - Jusqu'à 20 utilisateurs
          - Jusqu'à 50 utilisateurs

  - label: Rapports
    list:
      - value: Analytiques avancées
        included:
          - true # Plan gratuit
          - true # Plan Démarrage
          - true # Plan Pro
      - value: Rapports de base
        included:
          - false # Plan gratuit
          - true # Plan Démarrage
          - true # Plan Pro
      - value: Rapports professionnels
        included:
          - false # Plan gratuit
          - false # Plan Démarrage
          - true # Plan Pro
      - value: Générateur de rapports personnalisés
        included:
          - false
          - false
          - true

  - label: Support
    list:
      - value: Support en ligne 24/7
        included:
          - true # Plan gratuit
          - false # Plan Démarrage
          - false # Plan Pro
      - value: Ateliers de produits trimestriels
        included:
          - false # Plan gratuit
          - false # Plan Démarrage
          - true # Plan Pro
      - value: Support téléphonique prioritaire
        included:
          - false # Plan gratuit
          - false # Plan Démarrage
          - true # Plan Pro
      - value: Tour d'initiation 1:1
        included:
          - false
          - false
          - true
---
