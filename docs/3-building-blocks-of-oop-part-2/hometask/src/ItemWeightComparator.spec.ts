// @ts-nocheck

import { Item } from './Item';
import { ItemWeightComparator } from './ItemWeightComparator';

class ItemWithImplementation extends Item {
  use() {}
}

describe('ItemWeightComparator', () => {
  it('should call first item compare method if weights are equal', () => {
    const item = new ItemWithImplementation('ring', 2, 1);
    const item2 = new ItemWithImplementation('ring2', 1, 1);
    const compareToSpy = spyOn(item, 'compareTo');

    new ItemWeightComparator().compare(item, item2);

    expect(compareToSpy).toHaveBeenCalled();
  });

  it('should return 1 if current item weight is bigger', () => {
    const item = new ItemWithImplementation('ring', 2, 2);
    const item2 = new ItemWithImplementation('ring2', 1, 1);

    expect(new ItemWeightComparator().compare(item, item2)).toEqual(1);
  });

  it('should return -1 if current item weight is smaller', () => {
    const item = new ItemWithImplementation('ring', 1, 1);
    const item2 = new ItemWithImplementation('ring2', 2, 2);

    expect(new ItemWeightComparator().compare(item, item2)).toEqual(-1);
  });
});
