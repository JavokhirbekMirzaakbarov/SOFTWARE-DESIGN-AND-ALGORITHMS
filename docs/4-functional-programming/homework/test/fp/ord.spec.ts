import { fromCompare, Ordering, ordNumber, revert } from '../../src/fp/ord';

describe('Ord algebraic type', () => {
  it('ordNumber properly compares the numbers', () => {
    expect(ordNumber.compare(10, 5)).toBe(Ordering.greater);
    expect(ordNumber.compare(5, 10)).toBe(Ordering.less);
    expect(ordNumber.compare(10, 10)).toBe(Ordering.equal);
  });

  it('fromCompare returns an ord instance based on the predicate', () => {
    type Item = { value: number; effect: number }
    const predicate = (item1: Item, item2: Item) => (
      ordNumber.compare(item1.value * item1.effect, item2.value * item2.effect)
    );

    const ordItem = fromCompare(predicate);
    //                        10                          15
    expect(ordItem.compare({ value: 5, effect: 2 }, { value: 3, effect: 5 })).toBe(Ordering.less);
  });

  it('revert returns new instance of ord with reverted compare results', () => {
    const revertedOrdNumber = revert(ordNumber);

    expect(revertedOrdNumber.compare(10, 5)).toBe(Ordering.less);
  });
});
