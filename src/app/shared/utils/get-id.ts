export function getId<T extends { id: any }>(obj: T): T['id'] {
    return obj?.id;
}
