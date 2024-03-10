export default class Item {
  constructor(
    itemName,
    itemNo,
    itemTitle,
    itemDescription,
    itemBasePrice,
    itemStainCost, // itemStainPrice
    itemPaintCost, // itemPaintPrice
    sizeCost,
    sizes,
    positionA,
    positionB,
  ) {
    this.itemName = itemName;
    this.itemNo = itemNo;
    this.itemTitle = itemTitle;
    this.itemDescription = itemDescription;

    this.itemBasePrice = itemBasePrice;
    this.itemStainCost = itemStainCost;
    this.itemPaintCost = itemPaintCost;

    this.sizeCost = sizeCost;
    this.sizes = sizes;
    this.positionA = positionA;
    this.positionB = positionB;
  }
}
