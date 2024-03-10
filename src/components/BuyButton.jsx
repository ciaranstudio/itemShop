import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function BuyButton({
  item,
  itemNo,
  priceTotal,
  handleAddToCart,
  currentItemOptionSelect,
  currentItemSizeSelect,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddToCart}
        className="snipcart-add-item"
        data-item-id={item.itemNo}
        // data-item-image={imageUrl}
        data-item-name={item.itemTitle}
        // data-item-url="/"
        data-item-description={item.itemDescription}
        data-item-price={item.itemBasePrice}
        data-item-custom1-name="Finish option"
        data-item-custom1-options={`white[+${item.itemStainCost}]|natural[+${item.itemStainCost}]|black[+${item.itemStainCost}]|allBlack[+${item.itemStainCost}]|alabaster|pink|basil|yellow|blue|gray`}
        data-item-custom1-value={currentItemOptionSelect}
        data-item-custom2-name="Size option"
        data-item-custom2-options={
          item.sizes.length > 1
            ? `${item.sizes[0]}|${item.sizes[1]}[+${item.sizeCost}]`
            : `${item.sizes[0]}`
        }
        data-item-custom2-value={currentItemSizeSelect}
        sx={{
          display: itemNo === item.itemNo ? "block" : "none",
        }}
      >
        ${priceTotal}
      </Button>
    </Box>
  );
}
