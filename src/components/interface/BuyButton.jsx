import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { unselectedItem } from "../../data/objects.jsx";
import { objects } from "../../data/objects.jsx";

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button
        variant="contained"
        color="success"
        disabled={optionSelectedPrice === 0}
        className="snipcart-add-item"
        aria-label="add to shopping cart"
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
          color: "#ffffff",
          fontSize: "1rem",
          fontFamily: "var(--leva-fonts-mono)",
        }}
      >
        {optionSelectedPrice === 0 ? "..." : `$${optionSelectedPrice}`}
      </Button>
    </ThemeProvider>
  );
}
