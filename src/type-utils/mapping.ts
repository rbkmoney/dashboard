export type Mapping<
    Keys extends number | string | symbol,
    ExtendedValue,
    KeyValueObject extends { [name in Keys]: Value },
    Value extends ExtendedValue = ExtendedValue
> = {
    [name in Keys]: KeyValueObject[name];
};
