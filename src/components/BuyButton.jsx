import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useOptionStore } from "../store/useOptionStore.tsx";

export default function BuyButton({
  item,
  itemNo,
  // priceTotal,
  handleAddToCart,
  // currentItemOptionSelect,
  theme,
  // currentItemOptionType,
  // currentItemSizeSelect,
}) {
  const optionSelectedPrice = useOptionStore(
    (state) => state.items[item.itemName].optionSelectedPrice,
  );
  // const [price, setPrice] = useState(optionSelectedPrice);
  // useEffect(() => {
  //   setPrice(optionSelectedPrice);
  //   console.log(item.itemName);
  //   console.log(optionSelectedPrice);
  // }, [optionSelectedPrice, item]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        variant="outlined"
        // onClick={handleAddToCart}
        className="snipcart-add-item"
        data-item-id={item.itemNo}
        // data-item-image={imageUrl}
        data-item-name={item.itemTitle}
        data-item-url={`https://elibuilds-998b8-default-rtdb.firebaseio.com/${item.itemNo}.json`}
        data-item-description={item.itemDescription}
        data-item-price={optionSelectedPrice} // this isnt working when you have one selection set and then change it and add that to cart on top, need to put base price here and add options to make distinct?
        // data-item-custom1-name="Finish"
        // data-item-custom1-options={`white[+${item.itemStainCost}]|natural[+${item.itemStainCost}]|black[+${item.itemStainCost}]|allBlack[+${item.itemStainCost}]|alabaster|pink|basil|yellow|blue|gray`}
        // data-item-custom1-value={currentItemOptionSelect}
        // data-item-custom2-name="Size"
        // data-item-custom2-options={
        //   item.sizes.length > 1
        //     ? `${item.sizes[0]}|${item.sizes[1]}[+${item.sizeCost}]`
        //     : `${item.sizes[0]}`
        // }
        // data-item-custom2-value={currentItemSizeSelect}
        sx={{
          // display: itemNo === item.itemNo ? "block" : "none",
          display: item.itemTitle === "noSelectTitle" ? "none" : "block",
          pointerEvents: "auto",
          mt: 1,
          color: theme.palette.primary.light,
        }}
      >
        ${optionSelectedPrice}
      </Button>
    </Box>
  );
}
