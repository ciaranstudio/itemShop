export default class Item {
  constructor(
    itemName,
    itemNo,
    itemTitle,
    itemDescription,
    itemStainPrice,
    itemPaintPrice,
    sizeCost,
    sizes,
    positionA,
    positionB,
  ) {
    this.itemName = itemName;
    this.itemNo = itemNo;
    this.itemTitle = itemTitle;
    this.itemDescription = itemDescription;
    this.itemStainPrice = itemStainPrice;
    this.itemPaintPrice = itemPaintPrice;
    this.sizeCost = sizeCost;
    this.sizes = sizes;
    this.positionA = positionA;
    this.positionB = positionB;
  }
}
