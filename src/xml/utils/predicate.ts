/**
 * Predicate function of type `T`.
 */
export type Predicate<T> = (value: T) => boolean;

export function toPredicate<T>(
    predicate?: Predicate<T>,
    all?: boolean,
    options: { otherwise?: boolean } = {},
): Predicate<T> {
    const { otherwise = false } = options;

    if (predicate && all) {
        throw new Error('Only specify the predicate or a boolean value, not both');
    }

    if (predicate) {
        return predicate;
    }

    if (all !== undefined) {
        return (node: T) => all;
    }

    return (node: T) => otherwise;
}