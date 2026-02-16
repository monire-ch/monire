---
enable: true
title: Let’s Work Together.
subtitle: "Contact"

contactList:
  enable: true
  list:
    - label: "Email"
      value: "[hello@monire.ch](mailto:hello@monire.ch)"
    - label: "Location"
      value: "Zürich, Switzerland"

social:
  enable: true
  title: "Social"

form:
  emailSubject: "New form submission from Moniré website"
  submitButton:
    label: "Let's Talk"
  # This note will show at the end of form
  # note: |
  #   Your data is safe with us. We respect your privacy and never share your information. <br /> Read our [Privacy Policy](/privacy-policy/).
  inputs:
    - label: "Full Name"
      placeholder: "Full Name"
      name: "Full Name"
      required: true
      halfWidth: false
      defaultValue: ""
    - label: "Company Name"
      placeholder: "Company Name"
      name: "Company Name"
      required: false
      halfWidth: false
      defaultValue: ""
    - label: "Email Address"
      placeholder: "Email Address"
      name: "Email Address"
      required: true
      type: "email"
      halfWidth: false
      defaultValue: ""
    - label: "Current Website (if any)"
      placeholder: "Current Website"
      name: "Current Website"
      required: false
      halfWidth: false
      defaultValue: ""
    - label: "How can we help you?"
      placeholder: "How can we help you?"
      name: "How can we help you?"
      required: true
      halfWidth: false
      dropdown:
        type: ""
        search: # if type is search then it will work
          placeholder: ""
        items:
          - label: "Web Design"
            value: "Web Design"
          - label: "Web Development"
            value: "Web Development"
          - label: "AI Automations"
            value: "AI Automations"
          - label: "Website Migration"
            value: "Website Migration"
          - label: "SEO & Analytics"
            value: "SEO & Analytics"
          - label: "Other"
            value: "Other"
    - label: "Tell us about your project:"
      tag: "textarea"
      defaultValue: ""
      rows: "4" # Only work if tag is textarea
      placeholder: "Tell us about your project:"
      name: "Tell us about your project:"
      required: true
      halfWidth: false
    - label: "Your budget:"
      placeholder: "Your budget:"
      name: "Your budget:"
      required: false
      halfWidth: true
      dropdown:
        type: ""
        search: # if type is search then it will work
          placeholder: ""
        items:
          - label: "CHF 2’000 – 5’000"
            value: "CHF 2’000 – 5’000"
          - label: "CHF 5’000 – 10’000"
            value: "CHF 5’000 – 10’000"
          - label: "CHF 10’000 – 20’000"
            value: "CHF 10’000 – 20’000"
          - label: "CHF 20’000+"
            value: "CHF 20’000+"
    - label: "I agree to the terms and conditions and [privacy policy](/privacy-policy/)."
      name: "Agreed Privacy"
      value: "Agreed"
      checked: false
      required: true
      type: "checkbox"
      halfWidth: false
      defaultValue: ""
    - note: success
      parentClass: "hidden message success"
      content: We have received your message! We'll get back to you as soon as possible.
    - note: warning
      parentClass: "hidden message error"
      content: Something went wrong! Please contact us for assistance at [hello@monire.ch](hello@monire.ch)
---
