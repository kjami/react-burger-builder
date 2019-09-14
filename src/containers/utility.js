/* eslint-disable no-useless-escape */

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '';
    }

    if (isValid && rules.minLength) {
        isValid = value.length >= rules.minLength;
    }

    if (isValid && rules.maxLength) {
        isValid = value.length <= rules.maxLength;
    }

    if (isValid && rules.email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = regex.test(String(value).toLowerCase());
    }

    if (isValid && rules.excludeValues) {
        isValid = rules.excludeValues.indexOf(value) < 0;
    }

    return isValid;
}