export interface UkFieldError {
    name: string;
    message(label?: string, error?: any): string;
}

export const UkFieldRequiredError: UkFieldError = {
    name: 'required',
    message(label: string) {
        return `${label} field is required.`;
    }
}

export const UkFieldInvalidUserNameError: UkFieldError = {
    name: 'ukUserName',
    message(label: string) {
        return `${label} should be at least 6 chars, maximum 30 and can contain " _","+","-", "."`;
    }
}
export const UkFieldMaxLengthError: UkFieldError = {
    name: 'ukMaxLength',
    message(label: string, error: {requiredLength: number, actualLength: number}) {
        return `Please enter no more than ${error.requiredLength} characters.`;
    }
}