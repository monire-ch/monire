import {
  formspreeSubmit,
  netlifySubmit,
  formSubmit,
  setMessage,
} from "@/lib/utils/FormHandle";
import contact from "@/config/contact.json";

let prelineSelectInitialized = false;

async function initPrelineSelect() {
  try {
    const prelineSelectModule = await import("@preline/select");
    prelineSelectModule?.default?.autoInit?.();
    prelineSelectInitialized = true;
  } catch (error) {
    console.warn("Preline select failed to load:", error);
  }
}

export async function initContactForms(root: ParentNode = document) {
  const forms = root.querySelectorAll(
    "form.contact-form",
  ) as NodeListOf<HTMLFormElement>;

  if (!forms.length) {
    return;
  }

  const hasSelects = Array.from(forms).some((form) =>
    form.querySelector("select[data-hs-select]"),
  );

  if (hasSelects) {
    await initPrelineSelect();
  }

  const initForm = (form: HTMLFormElement) => {
    if (form.dataset.contactFormInitialized === "true") {
      return;
    }

    form.dataset.contactFormInitialized = "true";

    const selectTags = form.querySelectorAll(
      "select[data-hs-select]",
    ) as NodeListOf<HTMLSelectElement>;
    const emailInput = form.querySelector(
      'input[type="email"]',
    ) as HTMLInputElement | null;
    const validationMessages = {
      requiredSelect:
        form.dataset.msgRequiredSelect || "Please select an option.",
      invalidEmail:
        form.dataset.msgInvalidEmail || "Please enter a valid email address.",
      submitting: form.dataset.msgSubmitting || "Form Submitting!...",
      assistanceAt:
        form.dataset.msgAssistanceAt ||
        "Please contact us for assistance at",
    };

    selectTags.forEach((select) => {
      if (select.hasAttribute("required")) {
        select.removeAttribute("required");
      }
    });

    const validatePrelineSelect = (select: HTMLSelectElement): boolean => {
      const isRequired = select.getAttribute("data-required") === "true";
      const formData = new FormData(form);
      const selectedValues = formData.getAll(select.name).map(String);
      const hasValidValue = selectedValues.some(
        (value) => value && value !== "Choose",
      );
      const isEmpty = selectedValues.length === 0 || !hasValidValue;

      const wrapper = select.closest("#validation-target");
      if (!wrapper) return true;

      const errorMsg = wrapper.querySelector("p.select-error-message");
      const successMsg = wrapper.querySelector("p.text-white");

      if (isRequired && isEmpty) {
        wrapper.classList.add("hs-error");
        wrapper.classList.remove("hs-success");
        errorMsg?.classList.remove("hidden");
        successMsg?.classList.add("hidden");
        return false;
      }

      wrapper.classList.remove("hs-error");
      errorMsg?.classList.add("hidden");

      if (!isEmpty) {
        wrapper.classList.add("hs-success");
        successMsg?.classList.remove("hidden");
      } else {
        wrapper.classList.remove("hs-success");
        successMsg?.classList.add("hidden");
      }

      return true;
    };

    selectTags.forEach((select) => {
      select.addEventListener("change", () => {
        validatePrelineSelect(select);
      });
    });

    const isValidEmailFormat = (value: string): boolean =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

    const validateEmail = (): boolean => {
      if (!emailInput) return true;
      const value = emailInput.value.trim();

      if (!value) {
        emailInput.setCustomValidity("");
        return true;
      }

      if (!isValidEmailFormat(value)) {
        emailInput.setCustomValidity(validationMessages.invalidEmail);
        return false;
      }

      emailInput.setCustomValidity("");
      return true;
    };

    emailInput?.addEventListener("input", validateEmail);
    emailInput?.addEventListener("blur", validateEmail);

    const focusInvalidSelect = (select: HTMLSelectElement) => {
      const wrapper = select.closest("#validation-target");
      const toggle = wrapper?.querySelector(
        'button[aria-expanded]',
      ) as HTMLButtonElement | null;
      toggle?.focus();
    };

    const showFormMessage = (
      message: string,
      success: boolean,
      disableSubmit = false,
    ) => {
      setMessage(message, success, disableSubmit, form);
    };

    form.addEventListener("submit", async (event: Event) => {
      event.preventDefault();

      const provider = form.getAttribute("data-provider") || "";
      const action = form.getAttribute("data-action") || "";

      const orderedFields = Array.from(form.elements).filter((element) => {
        const field = element as
          | HTMLInputElement
          | HTMLTextAreaElement
          | HTMLSelectElement;
        if (!field.name || field.hasAttribute("disabled")) return false;
        if ("type" in field) {
          const inputType = (field as HTMLInputElement).type;
          if (
            inputType === "hidden" ||
            inputType === "submit" ||
            inputType === "button" ||
            inputType === "reset"
          ) {
            return false;
          }
        }
        return true;
      }) as Array<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

      for (const field of orderedFields) {
        if (
          field instanceof HTMLInputElement &&
          (field.type === "radio" || field.type === "checkbox")
        ) {
          if (!field.checkValidity()) {
            field.reportValidity();
            field.focus();
            return;
          }
          continue;
        }

        if (
          field instanceof HTMLSelectElement &&
          field.matches("[data-hs-select]")
        ) {
          if (!validatePrelineSelect(field)) {
            focusInvalidSelect(field);
            return;
          }
          continue;
        }

        if (field === emailInput && !validateEmail()) {
          emailInput.reportValidity();
          emailInput.focus();
          return;
        }

        if (!field.checkValidity()) {
          field.reportValidity();
          field.focus();
          return;
        }
      }

      showFormMessage(validationMessages.submitting, true, true);

      try {
        switch (provider) {
          case "netlify":
            await netlifySubmit(form, action);
            break;
          case "formsubmit.co":
            await formSubmit({ form, action });
            break;
          case "formspree":
            await formspreeSubmit(
              Object.fromEntries(new FormData(form).entries()) as Record<
                string,
                FormDataEntryValue
              >,
              5000,
              form,
            );
            break;
          default:
            throw new Error("Unknown form provider.");
        }
      } catch (error) {
        showFormMessage(
          `${error}! ${validationMessages.assistanceAt} [${contact.email}](mailto:${contact.email})`,
          false,
          false,
        );
      }
    });
  };

  forms.forEach((form) => {
    try {
      initForm(form);
    } catch (error) {
      console.error("Failed to initialize contact form", error);
    }
  });

  if (hasSelects && !prelineSelectInitialized) {
    await initPrelineSelect();
  }
}
