import { TextMaskConfig } from 'angular2-text-mask';

const dollarSign = '$';
const emptyString = '';
const comma = ',';
const period = '.';
const alternatePeriods = ['.', ','];
const minus = '-';
const minusRegExp = /-/;
const nonDigitsRegExp = /\D+/g;
const number = 'number';
const digitRegExp = /\d/;
const caretTrap = '[]';

type Mask = Array<RegExp | string>;

export function createNumberMask({
    prefix = dollarSign,
    suffix = emptyString,
    includeThousandsSeparator = true,
    thousandsSeparatorSymbol = comma,
    allowDecimal = false,
    decimalSeparator = period,
    alternateDecimalSeparators = alternatePeriods,
    decimalLimit = 2,
    requireDecimal = false,
    allowNegative = false,
    allowLeadingZeroes = false,
    integerLimit = null
} = {}): TextMaskConfig {
    const prefixLength = (prefix && prefix.length) || 0;
    const suffixLength = (suffix && suffix.length) || 0;
    const thousandsSeparatorSymbolLength = (thousandsSeparatorSymbol && thousandsSeparatorSymbol.length) || 0;

    function numberMask(rawValue = emptyString) {
        let currentDecimalSeparator = decimalSeparator;
        if (allowDecimal) {
            for (const ds of [decimalSeparator, ...alternateDecimalSeparators]) {
                if (rawValue.indexOf(ds) !== -1) {
                    currentDecimalSeparator = ds;
                    break;
                }
            }
        }
        const currentDecimalSeparatorMask: Mask = currentDecimalSeparator.split(emptyString);
        const decimalMask = new Array(decimalLimit).fill(0).map(() => digitRegExp);

        const rawValueLength = rawValue.length;

        if (rawValue === emptyString || (rawValue[0] === prefix[0] && rawValueLength === 1)) {
            return [...prefix.split(emptyString), digitRegExp, ...suffix.split(emptyString)];
        } else if (rawValue === currentDecimalSeparator && allowDecimal) {
            return [
                ...prefix.split(emptyString),
                '0',
                ...currentDecimalSeparatorMask,
                ...decimalMask,
                ...suffix.split(emptyString)
            ];
        }

        const isNegative = rawValue[0] === minus && allowNegative;
        //If negative remove "-" sign
        if (isNegative) {
            rawValue = rawValue.toString().substr(1);
        }

        const indexOfLastDecimal = rawValue.lastIndexOf(currentDecimalSeparator);
        const hasDecimal = indexOfLastDecimal !== -1;

        let integer;
        let fraction;
        let mask;

        // remove the suffix
        if (rawValue.slice(suffixLength * -1) === suffix) {
            rawValue = rawValue.slice(0, suffixLength * -1);
        }

        if (hasDecimal && (allowDecimal || requireDecimal)) {
            integer = rawValue.slice(rawValue.slice(0, prefixLength) === prefix ? prefixLength : 0, indexOfLastDecimal);

            fraction = rawValue.slice(indexOfLastDecimal + 1, rawValueLength);
            fraction = convertToMask(fraction.replace(nonDigitsRegExp, emptyString));
        } else {
            if (rawValue.slice(0, prefixLength) === prefix) {
                integer = rawValue.slice(prefixLength);
            } else {
                integer = rawValue;
            }
        }

        if (integerLimit && typeof integerLimit === number) {
            const thousandsSeparatorRegex = thousandsSeparatorSymbol === '.' ? '[.]' : `${thousandsSeparatorSymbol}`;
            const numberOfThousandSeparators = (integer.match(new RegExp(thousandsSeparatorRegex, 'g')) || []).length;

            integer = integer.slice(0, integerLimit + numberOfThousandSeparators * thousandsSeparatorSymbolLength);
        }

        integer = integer.replace(nonDigitsRegExp, emptyString);

        if (!allowLeadingZeroes) {
            integer = integer.replace(/^0+(0$|[^0])/, '$1');
        }

        integer = includeThousandsSeparator ? addThousandsSeparator(integer, thousandsSeparatorSymbol) : integer;

        mask = convertToMask(integer);

        if ((hasDecimal && allowDecimal) || requireDecimal === true) {
            if (rawValue[indexOfLastDecimal - 1] !== currentDecimalSeparator) {
                mask.push(caretTrap);
            }

            mask.push(...currentDecimalSeparatorMask, caretTrap);

            if (fraction) {
                mask = mask.concat(decimalMask);
            }

            if (requireDecimal === true && rawValue[indexOfLastDecimal - 1] === currentDecimalSeparator) {
                mask.push(digitRegExp);
            }
        }

        if (prefixLength > 0) {
            mask = prefix.split(emptyString).concat(mask);
        }

        if (isNegative) {
            // If user is entering a negative number, add a mask placeholder spot to attract the caret to it.
            if (mask.length === prefixLength) {
                mask.push(digitRegExp);
            }

            mask = [minusRegExp].concat(mask);
        }

        if (suffix.length > 0) {
            mask = mask.concat(suffix.split(emptyString));
        }

        return mask;
    }

    function numberPipe(conformedValue: string, config: TextMaskConfig) {
        const indexesOfPipedChars = [];
        let value = conformedValue;

        if (conformedValue.indexOf(decimalSeparator) === -1) {
            for (const ds of alternateDecimalSeparators) {
                const idx = value.indexOf(ds);
                if (idx !== -1) {
                    value = value.replace(ds, decimalSeparator);
                    if (ds.length === decimalSeparator.length) {
                        indexesOfPipedChars.push(...new Array(ds.length).fill(0).map((im, i) => idx - 1 + i));
                    } else {
                        indexesOfPipedChars.push(
                            ...new Array(value.length - idx - 1).fill(0).map((im, i) => idx - 1 + i)
                        );
                    }
                    break;
                }
            }
        }

        return { value, indexesOfPipedChars };
    }

    numberMask.instanceOf = 'createNumberMask';

    return { mask: numberMask, pipe: numberPipe, guide: false };
}

function convertToMask(strNumber) {
    return strNumber.split(emptyString).map(char => (digitRegExp.test(char) ? digitRegExp : char));
}

// http://stackoverflow.com/a/10899795/604296
function addThousandsSeparator(n, thousandsSeparatorSymbol) {
    return n.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol);
}
