/**
 * Keystroke-level cleanup shared by every demat lead form.
 *
 * These mirror what the live DIY form at diy.sbisecurities.in does as the
 * visitor types: the name is held to letters and single spaces in the case PAN
 * records it, and the mobile field takes digits only, on an Indian prefix, up
 * to ten. Doing it on input rather than on submit keeps the field and the
 * schema in `validations/forms/dematAccountForm.schema` from disagreeing.
 */

export function normalizeFullNameInput(value: string): string {
    return value
        .replace(/[^a-zA-Z\s]/g, "")
        .replace(/^\s+/, "")
        .replace(/\s+/g, " ")
        .toUpperCase();
}

export function normalizeMobileNumberInput(value: string): string {
    return value
        .replace(/\D/g, "")
        .replace(/^[^6-9]+/, "")
        .slice(0, 10);
}
