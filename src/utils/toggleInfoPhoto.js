import { useOptionStore } from "../store/useOptionStore.tsx";

export const toggleInfoBox = (e) => {
  const open = useOptionStore((state) => state.open);
  const showBackground = useOptionStore((state) => state.showBackground);
  const showPartOptions = useOptionStore((state) => state.showPartOptions);
  const setOpen = useOptionStore((state) => state.setOpen);
  const setShowPhotos = useOptionStore((state) => state.setShowPhotos);
  const setAboutInfo = useOptionStore((state) => state.setAboutInfo);
  const setShowPartOptions = useOptionStore(
    (state) => state.setShowPartOptions,
  );
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  setAboutInfo(false);
  setOpen(!open);
  setShowPhotos(false);
  if (showPartOptions) {
    setShowPartOptions(false);
  } else {
    if (!showBackground) setShowPartOptions(true);
  }
};

export const togglePhotoBox = (e) => {
  const showPhotos = useOptionStore((state) => state.showPhotos);
  const showBackground = useOptionStore((state) => state.showBackground);
  const showPartOptions = useOptionStore((state) => state.showPartOptions);
  const setOpen = useOptionStore((state) => state.setOpen);
  const setShowPhotos = useOptionStore((state) => state.setShowPhotos);
  const setAllPhotos = useOptionStore((state) => state.setAllPhotos);
  const setShowPartOptions = useOptionStore(
    (state) => state.setShowPartOptions,
  );
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  setAllPhotos(false);
  setOpen(false);
  setShowPhotos(!showPhotos);

  if (showPartOptions) {
    setShowPartOptions(false);
  } else {
    if (!showBackground) setShowPartOptions(true);
  }
};
