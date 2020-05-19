import { TextMaskConfig } from 'angular2-text-mask';

const NON_DIGITS_REG_EXP = /\D+/g;
const DIGIT_REG_EXP = /\d/;
const CARET_TRAP = '[]';

export function createNumberMask({
    prefix = '',
    suffix = '',
    includeThousandsSeparator = true,
    thousandsSeparatorSymbol = ',',
    allowDecimal = false,
    decimalSymbol = '.',
    decimalLimit = 2,
    decimalSuffixMask = [' '],
    requireDecimal = false,
    allowNegative = false,
    allowLeadingZeroes = false,
    integerLimit = null,
} = {}): TextMaskConfig {
    const prefixLength = (prefix && prefix.length) || 0;
    const suffixLength = (suffix && suffix.length) || 0;
    const thousandsSeparatorSymbolLength = (thousandsSeparatorSymbol && thousandsSeparatorSymbol.length) || 0;

    function numberMask(rawValue = '') {
        const rawValueLength = rawValue.length;

        if (rawValue === '' || (rawValue[0] === prefix[0] && rawValueLength === 1)) {
            return [...prefix.split(''), DIGIT_REG_EXP, ...suffix.split('')];
        } else if (rawValue === decimalSymbol && allowDecimal) {
            return [...prefix.split(''), '0', decimalSymbol, ...decimalSuffixMask, DIGIT_REG_EXP, ...suffix.split('')];
        }

        const isNegative = rawValue[0] === '-' && allowNegative;
        // If negative remove "-" sign
        if (isNegative) {
            rawValue = rawValue.toString().substr(1);
        }

        const indexOfLastDecimal = rawValue.lastIndexOf(decimalSymbol);
        const hasDecimal = indexOfLastDecimal !== -1;

        let integer: string;
        let fraction: Array<string | RegExp>;

        // remove the suffix
        if (rawValue.slice(suffixLength * -1) === suffix) {
            rawValue = rawValue.slice(0, suffixLength * -1);
        }

        if (hasDecimal && (allowDecimal || requireDecimal)) {
            integer = rawValue.slice(rawValue.slice(0, prefixLength) === prefix ? prefixLength : 0, indexOfLastDecimal);

            const fractionStr = rawValue.slice(indexOfLastDecimal + 1, rawValueLength);
            fraction = convertToMask(fractionStr.replace(NON_DIGITS_REG_EXP, ''));
        } else {
            if (rawValue.slice(0, prefixLength) === prefix) {
                integer = rawValue.slice(prefixLength);
            } else {
                integer = rawValue;
            }
        }

        if (integerLimit && typeof integerLimit === 'number') {
            const thousandsSeparatorRegex = thousandsSeparatorSymbol === '.' ? '[.]' : `${thousandsSeparatorSymbol}`;
            const numberOfThousandSeparators = (integer.match(new RegExp(thousandsSeparatorRegex, 'g')) || []).length;

            integer = integer.slice(0, integerLimit + numberOfThousandSeparators * thousandsSeparatorSymbolLength);
        }

        integer = integer.replace(NON_DIGITS_REG_EXP, '');

        if (!allowLeadingZeroes) {
            integer = integer.replace(/^0+(0$|[^0])/, '$1');
        }

        integer = includeThousandsSeparator ? addThousandsSeparator(integer, thousandsSeparatorSymbol) : integer;

        let mask: Array<string | RegExp> = convertToMask(integer);

        if ((hasDecimal && allowDecimal) || requireDecimal) {
            if (rawValue[indexOfLastDecimal - 1] !== decimalSymbol) {
                mask.push(CARET_TRAP);
            }

            mask.push(decimalSymbol, CARET_TRAP, ...decimalSuffixMask);

            if (fraction) {
                if (typeof decimalLimit === 'number') {
                    fraction = fraction.slice(0, decimalLimit);
                }

                mask = mask.concat(fraction);
            }

            if (requireDecimal === true && rawValue[indexOfLastDecimal - 1] === decimalSymbol) {
                mask.push(DIGIT_REG_EXP);
            }
        }

        if (prefixLength > 0) {
            mask = [...prefix.split(''), ...mask];
        }

        if (isNegative) {
            // If user is entering a negative number, add a mask placeholder spot to attract the caret to it.
            if (mask.length === prefixLength) {
                mask.push(DIGIT_REG_EXP);
            }

            mask = [/-/, ...mask];
        }

        if (suffix.length > 0) {
            mask = mask.concat(suffix.split(''));
        }

        return mask;
    }

    numberMask.instanceOf = 'createNumberMask';

    return { mask: numberMask, guide: false };
}

function convertToMask(strNumber: string): Array<string | RegExp> {
    return strNumber.split('').map((char) => (DIGIT_REG_EXP.test(char) ? DIGIT_REG_EXP : char));
}

// http://stackoverflow.com/a/10899795/604296
function addThousandsSeparator(n, thousandsSeparatorSymbol) {
    return n.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol);
}
