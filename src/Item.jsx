export default class Item {
  constructor(
    itemType,
    itemNo,
    optionSelect,
    setOptionSelect,
    itemStain,
    setItemStain,
    itemPaint,
    setItemPaint,
    itemTexture,
    setItemTexture,
    position,
    setPosition,
  ) {
    this.itemType = itemType;
    this.itemNo = itemNo;
    this.optionSelect = optionSelect;
    this.setOptionSelect = setOptionSelect;
    this.itemStain = itemStain;
    this.setItemStain = setItemStain;
    this.itemPaint = itemPaint;
    this.setItemPaint = setItemPaint;
    this.itemTexture = itemTexture;
    this.setItemTexture = setItemTexture;
    this.position = position;
    this.setPosition = setPosition;
  }
}
