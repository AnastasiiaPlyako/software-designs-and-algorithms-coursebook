import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class Inventory {
    items: Item[] = [];

    sort(comparator?: ItemComparator) {
        if (comparator) {
            this.items.sort((firstItem, secondItem) =>
                comparator.compare(firstItem, secondItem));
        } else {
            this.items.sort((first, second) => first.value - second.value);
        }
    }
    toString() {
        return this.items.join(", ");
    }

    addItem(item: Item) {
        this.items.push(item);
    }
}
