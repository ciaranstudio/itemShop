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
    position,
  ) {
    this.itemName = itemName;
    this.itemNo = itemNo;
    this.itemTitle = itemTitle;
    this.itemDescription = itemDescription;
    this.itemStainPrice = itemStainPrice;
    this.itemPaintPrice = itemPaintPrice;
    this.sizeCost = sizeCost;
    this.sizes = sizes;
    this.position = position;
  }
}
