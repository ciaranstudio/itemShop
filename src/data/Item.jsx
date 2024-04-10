export default class Item {
  constructor(
    itemNo,
    itemName,
    itemTitle,
    itemDescription,
    itemLongDescription,
    itemBasePrice, // painted single color price (base)
    itemStainCost, // stained single color additional cost
    itemMixedPaintCost, // mixed paint color additional cost
    itemMixedStainCost, // mixed stain color additional cost
    size,
    position,
    parts,
    images,
  ) {
    this.itemNo = itemNo;
    this.itemName = itemName;
    this.itemTitle = itemTitle;
    this.itemDescription = itemDescription;
    this.itemLongDescription = itemLongDescription;
    this.itemBasePrice = itemBasePrice;
    this.itemStainCost = itemStainCost;
    this.itemMixedPaintCost = itemMixedPaintCost;
    this.itemMixedStainCost = itemMixedStainCost;
    this.size = size;
    this.position = position;
    this.parts = parts;
    this.images = images;
  }
}
