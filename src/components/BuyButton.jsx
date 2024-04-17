// import { useEffect } from "react";
// import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import { useOptionStore } from "../store/useOptionStore.tsx";
import { unselectedItem } from "../data/objects.jsx";
import { objects } from "../data/objects.jsx";

export default function BuyButton({ item, theme }) {
  // state from store
  const optionSelectedPrice = useOptionStore(
    (state) =>
      state.items[
        item === unselectedItem ? objects.gramps.itemName : item.itemName
      ].optionSelectedPrice,
  );

  const optionCartList = useOptionStore(
    (state) =>
      state.items[
        item === unselectedItem ? objects.gramps.itemName : item.itemName
      ].optionCartList,
  );

  const snipCartOption = useOptionStore(
    (state) =>
      state.items[
        item === unselectedItem ? objects.gramps.itemName : item.itemName
      ].snipCartOption,
  );

  // const stainSingle = useOptionStore(
  //   (state) =>
  //     state.items[
  //       item === unselectedItem ? objects.gramps.itemName : item.itemName
  //     ].stainSingle,
  // );

  // const stainMixed = useOptionStore(
  //   (state) =>
  //     state.items[
  //       item === unselectedItem ? objects.gramps.itemName : item.itemName
  //     ].stainMixed,
  // );

  // const paintSingle = useOptionStore(
  //   (state) =>
  //     state.items[
  //       item === unselectedItem ? objects.gramps.itemName : item.itemName
  //     ].paintSingle,
  // );

  // const paintMixed = useOptionStore(
  //   (state) =>
  //     state.items[
  //       item === unselectedItem ? objects.gramps.itemName : item.itemName
  //     ].paintMixed,
  // );

  // const optionColorNameList = useOptionStore(
  //   (state) =>
  //     state.items[
  //       item === unselectedItem ? objects.gramps.itemName : item.itemName
  //     ].optionColorNameList,
  // );

  // const optionCompleteList = useOptionStore(
  //   (state) =>
  //     state.items[
  //       item === unselectedItem ? objects.gramps.itemName : item.itemName
  //     ].optionCompleteList,
  // );

  // const snipCartOptionDesc = useOptionStore(
  //   (state) =>
  //     state.items[
  //       item === unselectedItem ? objects.gramps.itemName : item.itemName
  //     ].snipCartOptionDesc,
  // );

  // const currentItemSelected = useOptionStore(
  //   (state) => state.currentItemSelected,
  // );
  // const setCurrentItemSelected = useOptionStore((state) => state.setCurrentItemSelected);

  // const previousItemSelected = useOptionStore(
  //   (state) => state.previousItemSelected,
  // );
  // const setPreviousItemSelected = useOptionStore((state) => state.setPreviousItemSelected);

  // const currentPartName = useOptionStore(
  //   (state) => state.currentPartName,
  // );
  // const setCurrentPartName = useOptionStore((state) => state.setCurrentPartName);

  // const currentItemName = useOptionStore(
  //   (state) => state.currentItemName,
  // );
  // const setCurrentItemName = useOptionStore((state) => state.setCurrentItemName);

  // const mobileView = useOptionStore((state) => state.mobileView);
  // const setMobileView = useOptionStore((state) => state.setMobileView);

  // const open = useOptionStore((state) => state.open);
  // const setOpen = useOptionStore((state) => state.setOpen);

  // const showPhotos = useOptionStore((state) => state.showPhotos);
  // const setShowPhotos = useOptionStore((state) => state.setShowPhotos);

  // const allPhotos = useOptionStore((state) => state.allPhotos);
  // const setAllPhotos = useOptionStore((state) => state.setAllPhotos);

  // const aboutInfo = useOptionStore((state) => state.aboutInfo);
  // const setAboutInfo = useOptionStore((state) => state.setAboutInfo);

  // const optionBoxHeightMin = useOptionStore((state) => state.optionBoxHeightMin);
  // const setOptionBoxHeightMin = useOptionStore((state) => state.setOptionBoxHeightMin);

  // const showBackground = useOptionStore((state) => state.showBackground);
  // const setShowBackground = useOptionStore((state) => state.setShowBackground);

  // const showPartOptions = useOptionStore((state) => state.showPartOptions);
  // const setShowPartOptions = useOptionStore((state) => state.setShowPartOptions);

  // const optionBoxItemChanged = useOptionStore(
  //   (state) => state.optionBoxItemChanged,
  // );
  // const setOptionBoxItemChanged = useOptionStore((state) => state.setOptionBoxItemChanged);

  // const optionBoxItemToggle = useOptionStore(
  //   (state) => state.optionBoxItemToggle,
  // );
  // const setOptionBoxItemToggle = useOptionStore((state) => state.setOptionBoxItemToggle);

  // const animToggled = useOptionStore((state) => state.animToggled);
  // const setAnimToggled = useOptionStore((state) => state.setAnimToggled);

  // const animActive = useOptionStore((state) => state.animActive);
  // const setAnimActive = useOptionStore((state) => state.setAnimActive);

  // const activeCamPosAnim = useOptionStore((state) => state.activeCamPosAnim);
  // const setActiveCamPosAnim = useOptionStore((state) => state.setActiveCamPosAnim);

  // const activeCamTargAnim = useOptionStore((state) => state.activeCamTargAnim);
  // const setActiveCamTargAnim = useOptionStore((state) => state.setActiveCamTargAnim);

  // const activeCamAnim = useOptionStore((state) => state.activeCamAnim);
  // const setActiveCamAnim = useOptionStore((state) => state.setActiveCamAnim);

  // const partsOpen = useOptionStore((state) => state.partsOpen);
  // const setPartsOpen = useOptionStore((state) => state.setPartsOpen);

  // const animIconToggle = useOptionStore((state) => state.animIconToggle);
  // const setAnimIconToggle = useOptionStore((state) => state.setAnimIconToggle);

  // useEffects
  // useEffect(() => {
  //   console.log("BuyButton item.itemName: ", item.itemName);
  //   console.log("optionColorNameList: ", optionColorNameList);
  //   console.log("optionEntryList: ", optionCompleteList);
  //   console.log("optionCartList: ", optionCartList);
  //   console.log("snipCartOptionDesc: ", snipCartOptionDesc);
  //   console.log("snipCartOption: ", snipCartOption);
  // }, [
  //   item,
  //   optionColorNameList,
  //   optionCompleteList,
  //   optionCartList,
  //   snipCartOption,
  //   snipCartOptionDesc,
  // ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Button
        variant="contained"
        color="success"
        disabled={optionSelectedPrice === 0}
        // onClick={handleAddToCart}
        className="snipcart-add-item"
        data-item-id={item.itemNo}
        // data-item-image={imageUrl}
        data-item-name={item.itemTitle}
        data-item-url={`https://elibuilds-998b8-default-rtdb.firebaseio.com/${item.itemNo}.json`}
        data-item-description={item.itemDescription}
        data-item-price={item.itemBasePrice}
        data-item-custom1-name="Type"
        data-item-custom1-type="readonly"
        data-item-custom1-options={`singleStain[+${item.itemStainCost}]|mixedStain[+${item.itemMixedStainCost}]|mixedStainPaint[+${item.itemMixedStainCost}]|mixedPaint[+${item.itemMixedPaintCost}]|singlePaint`}
        data-item-custom1-value={snipCartOption}
        data-item-custom2-name="Parts"
        data-item-custom2-type="readonly"
        data-item-custom2-value={optionCartList}
        sx={{
          display: item === unselectedItem ? "none" : "block",
          pointerEvents: "auto",
          // mt: 0.25,
          // mb: 0.25,
          // mt: 1.25,
          color: "#ffffff",
          fontSize: "1rem",
          // fontSize: "8rem",
          // padding: "1rem",
          // paddingX: "1rem",
          // marginBottom: "1rem",
          // padding: "4rem",
          // paddingX: "8rem",
          // marginBottom: "0.5rem",
          // marginBottom: "6rem",
          // borderRadius: "0.5rem",
          // borderRadius: "2rem",
          fontFamily: "var(--leva-fonts-mono)",
          // color:
          //   item === unselectedItem ? theme.palette.primary.light : "#929d84",
        }}
      >
        {optionSelectedPrice === 0 ? "..." : `$${optionSelectedPrice}`}
      </Button>
    </ThemeProvider>
  );
}
