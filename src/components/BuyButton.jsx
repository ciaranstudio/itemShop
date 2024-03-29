import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useOptionStore } from "../store/useOptionStore.tsx";
import { unselectedItem } from "../data/objects.jsx";
import { objects } from "../data/objects.jsx";

export default function BuyButton({ item, theme }) {
  const optionSelectedPrice = useOptionStore(
    (state) =>
      state.items[
        item === unselectedItem ? objects.gramps.itemName : item.itemName
      ].optionSelectedPrice,
  );

  const stainSingle = useOptionStore(
    (state) =>
      state.items[
        item === unselectedItem ? objects.gramps.itemName : item.itemName
      ].stainSingle,
  );

  const stainMixed = useOptionStore(
    (state) =>
      state.items[
        item === unselectedItem ? objects.gramps.itemName : item.itemName
      ].stainMixed,
  );

  const paintSingle = useOptionStore(
    (state) =>
      state.items[
        item === unselectedItem ? objects.gramps.itemName : item.itemName
      ].paintSingle,
  );

  const paintMixed = useOptionStore(
    (state) =>
      state.items[
        item === unselectedItem ? objects.gramps.itemName : item.itemName
      ].paintMixed,
  );

  // const optionSelectedList = useOptionStore(
  //   (state) =>
  //     state.items[
  //       item === unselectedItem ? objects.gramps.itemName : item.itemName
  //     ].optionSelectedList,
  // );

  const optionCartList = useOptionStore(
    (state) =>
      state.items[
        item === unselectedItem ? objects.gramps.itemName : item.itemName
      ].optionCartList,
  );

  const optionColorNameList = useOptionStore(
    (state) =>
      state.items[
        item === unselectedItem ? objects.gramps.itemName : item.itemName
      ].optionColorNameList,
  );

  const optionEntryList = useOptionStore(
    (state) =>
      state.items[
        item === unselectedItem ? objects.gramps.itemName : item.itemName
      ].optionEntryList,
  );

  useEffect(() => {
    // console.log("optionSelectedList: ", optionSelectedList);
    console.log("optionColorNameList: ", optionColorNameList);
    console.log("optionEntryList: ", optionEntryList);
    console.log("optionCartList: ", optionCartList);
  }, [optionColorNameList, optionEntryList, optionCartList]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        variant="outlined"
        disabled={optionSelectedPrice === 0}
        // onClick={handleAddToCart}
        className="snipcart-add-item"
        data-item-id={item.itemNo}
        // data-item-image={imageUrl}
        data-item-name={item.itemTitle}
        data-item-url={`https://elibuilds-998b8-default-rtdb.firebaseio.com/${item.itemNo}.json`}
        data-item-description={item.itemDescription}
        data-item-price={optionSelectedPrice} // this isnt working when you have one selection set and then change it and add that to cart on top, need to put base price here and add options to make distinct?
        // data-item-custom1-name="Color option"
        // data-item-custom1-options={`white[+${item.itemStainCost}]|natural[+${item.itemStainCost}]|black[+${item.itemStainCost}]|allBlack[+${item.itemStainCost}]|alabaster|pink|basil|yellow|blue|gray`}
        // data-item-custom1-value={currentItemOptionSelect}
        sx={{
          display: item === unselectedItem ? "none" : "block",
          pointerEvents: "auto",
          mt: 1,
          color: theme.palette.primary.light,
        }}
      >
        {optionSelectedPrice === 0 ? "..." : `$${optionSelectedPrice}`}
      </Button>
    </Box>
  );
}
