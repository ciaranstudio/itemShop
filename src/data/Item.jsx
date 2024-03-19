export default class Item {
  constructor(
    itemNo,
    itemName,
    itemTitle,
    itemDescription,
    itemBasePrice, // painted single color
    itemStainCost, // stained single color
    itemMixedPaintCost,
    itemMixedStainCost,
    size,
    position,
    parts,
  ) {
    this.itemNo = itemNo;
    this.itemName = itemName;
    this.itemTitle = itemTitle;
    this.itemDescription = itemDescription;
    this.itemBasePrice = itemBasePrice;
    this.itemStainCost = itemStainCost;
    this.itemMixedPaintCost = itemMixedPaintCost;
    this.itemMixedStainCost = itemMixedStainCost;
    this.size = size;
    this.position = position;
    this.parts = parts;
  }
}
