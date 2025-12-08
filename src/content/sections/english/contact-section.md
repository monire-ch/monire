---
enable: true
title: Let’s Work Together.
subtitle: "Contact"

contactList:
  enable: true
  list:
    - icon: "/images/icons/svg/email.svg"
      label: "Email us"
      # replace with email from config
      value: "hello@monire.ch"

social:
  enable: true
  title: "Follow us on social media"

# Check config.toml file for form action related settings
form:
  emailSubject: "New form submission from upstart website" # Customized email subject (applicable when anyone submit form, form submission may receive by email depend on provider)
  submitButton:
    label: "Submit"
  # This note will show at the end of form
  # note: |
  #   Your data is safe with us. We respect your privacy and never share your information. <br /> Read our [Privacy Policy](/privacy-policy/).
  inputs:
    - label: ""
      placeholder: "Full Name"
      name: "Full Name" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      halfWidth: true
      defaultValue: ""
    - label: ""
      placeholder: "Email Address"
      name: "Email Address" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      type: "email"
      halfWidth: true
      defaultValue: ""
    - label: ""
      placeholder: "Phone Number"
      name: "Phone Number" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      type: "text"
      halfWidth: true
      defaultValue: ""
    - label: ""
      placeholder: "Company"
      name: "Company" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      type: "text"
      halfWidth: true
      defaultValue: ""
    - label: ""
      placeholder: "Subject"
      name: "Subject" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      halfWidth: true
      dropdown:
        type: "" # select | search - default is select
        search: # if type is search then it will work
          placeholder: ""
        items:
          - label: "Example 01"
            value: "Example 01"
          - label: "Example 02"
            value: "Example 02"
          - label: "Example 03"
            value: "Example 03"
    - label: ""
      placeholder: "Subject With Search"
      name: "Subject With Search" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      halfWidth: true
      dropdown:
        type: "search" # select | search - default is select
        search: # if type is search then it will work
          placeholder: "Subject With Search"
        items:
          - label: "Lowni Saiki"
            value: "Lowni Saiki"
          - label: "Sikow Pow"
            value: "Sikow Pow"
          - label: "Kenbi Shaktun"
            value: "Kenbi Shaktun"
          - label: "Aruyyo Kawn"
            value: "Aruyyo Kawn"
          - label: "Marong Lowbbi"
            value: "Marong Lowbbi"
    - label: ""
      tag: "textarea"
      defaultValue: ""
      rows: "4" # Only work if tag is textarea
      placeholder: "Enter your message."
      name: "Message" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      halfWidth: false
    - label: "Google Search" # only valid for type="checkbox" & type === "radio"
      checked: false # only valid for type="checkbox" & type === "radio"
      name: "User Source" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      groupLabel: "How did you hear about us?" # Radio Inputs Label
      group: "source" # when you add group then it will omit space between the same group radio input
      type: "radio"
      halfWidth: true
      defaultValue: ""
    - label: "Social Media" # only valid for type="checkbox" & type === "radio"
      name: "User Source" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      groupLabel: "" # Radio Inputs Label
      group: "source" # when you add group then it will omit space between the same group radio input
      type: "radio"
      halfWidth: true
      defaultValue: ""
    - label: "Referral" # only valid for type="checkbox" & type === "radio"
      name: "User Source" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      groupLabel: "" # Radio Inputs Label
      group: "source" # when you add group then it will omit space between the same group radio input
      type: "radio"
      halfWidth: true
      defaultValue: ""
    - label: "Other" # only valid for type="checkbox" & type === "radio"
      name: "User Source" # This is crucial. Its indicate under which name you want to receive this field data
      required: true
      groupLabel: "" # Radio Inputs Label
      group: "source" # when you add group then it will omit space between the same group radio input
      type: "radio"
      halfWidth: true
      defaultValue: ""
    - label: "I agree to the terms and conditions and [privacy policy](/contact/)." # only valid for type="checkbox" & type === "radio"
      name: "Agreed Privacy" # This is crucial. Its indicate under which name you want to receive this field data
      value: "Agreed" # Value that will be submit (applicable for type="checkbox" & type === "radio")
      checked: false # only valid for type="checkbox" & type === "radio"
      required: true
      type: "checkbox"
      halfWidth: false
      defaultValue: ""
    - note: success # info | warning | success | deprecated | hint
      parentClass: "hidden message success"
      content: We have received your message! We'll get back to you as soon as possible.
    - note: warning # info | warning | success | deprecated | hint
      parentClass: "hidden message error"
      content: Something went wrong! please use this mail - [upstart-astro-theme@gmail.com](mailto:upstart-astro-theme@gmail.com) to submit a ticket!
    # - note: info # info | warning | success | deprecated | hint
    #   parentClass: "text-sm message success"
    #   content: We have received your message! We'll get back to you as soon as possible.
    # - note: warning # info | warning | success | deprecated | hint
    #   parentClass: "text-sm message error"
    #   content: Something went wrong! please use this mail - [upstart-astro-theme@gmail.com](mailto:upstart-astro-theme@gmail.com) to submit a ticket!
    # - note: success # info | warning | success | deprecated | hint
    #   parentClass: "text-sm message success"
    #   content: We have received your message! We'll get back to you as soon as possible.
    # - note: deprecated # info | warning | success | deprecated | hint
    #   parentClass: "text-sm message error"
    #   content: Something went wrong! please use this mail - [upstart-astro-theme@gmail.com](mailto:upstart-astro-theme@gmail.com) to submit a ticket!
    # - note: hint # info | warning | success | deprecated | hint
    #   parentClass: "text-sm message error"
    #   content: Something went wrong! please use this mail - [upstart-astro-theme@gmail.com](mailto:upstart-astro-theme@gmail.com) to submit a ticket!
    # - note: we # info | warning | success | deprecated | hint
    #   parentClass: "text-sm message error"
    #   content: Something went wrong! please use this mail - [upstart-astro-theme@gmail.com](mailto:upstart-astro-theme@gmail.com) to submit a ticket!
---
