export const transformUserInput = (value: string, country: string): string => {
    let formatPhone = value.replace(/\s/g, '');
    switch (country) {
        case 'RU': {
            if (formatPhone.length > 3 && formatPhone.length <= 6)
                formatPhone = `${formatPhone.slice(0, 3)} ${formatPhone.slice(3)}`;
            else if (formatPhone.length > 6 && formatPhone.length <= 8)
                formatPhone = `${formatPhone.slice(0, 3)} ${formatPhone.slice(3, 6)} ${formatPhone.slice(6)}`;
            else if (formatPhone.length > 8)
                formatPhone = `${formatPhone.slice(0, 3)} ${formatPhone.slice(3, 6)} ${formatPhone.slice(
                    6,
                    8
                )} ${formatPhone.slice(8)}`;
            return formatPhone;
        }
        case 'EG': {
            if (formatPhone.length > 1) formatPhone = `${formatPhone.slice(0, 1)} ${formatPhone.slice(1)}`;
            return formatPhone;
        }
        case 'IN': {
            if (formatPhone.length > 4 && formatPhone.length <= 7)
                formatPhone = `${formatPhone.slice(0, 4)} ${formatPhone.slice(4)}`;
            else if (formatPhone.length > 7)
                formatPhone = `${formatPhone.slice(0, 4)} ${formatPhone.slice(4, 7)} ${formatPhone.slice(7)}`;
            return formatPhone;
        }
        case 'US':
        case 'CA':
        default: {
            if (formatPhone.length > 3 && formatPhone.length <= 6)
                formatPhone = `${formatPhone.slice(0, 3)} ${formatPhone.slice(3)}`;
            else if (formatPhone.length > 6)
                formatPhone = `${formatPhone.slice(0, 3)} ${formatPhone.slice(3, 6)} ${formatPhone.slice(6)}`;
            return formatPhone;
        }
    }
};

/**
 * For application development teams, there are 3rd-party libraries that can be utilized to validate phone numbers.
 * Example here: https://github.com/s-yadav/react-number-format
 */
export const checkPhoneNumber = (phoneNumber: string, countryCode: string): boolean => {
    switch (countryCode) {
        case 'RU': {
            return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/.test(phoneNumber);
        }
        case 'EG': {
            return /^\(?([0-9]{1})\)?[-. ]?([0-9]{7})$/.test(phoneNumber);
        }
        case 'IN': {
            return /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(phoneNumber);
        }
        case 'US':
        case 'CA':
        default: {
            return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNumber);
        }
    }
};
