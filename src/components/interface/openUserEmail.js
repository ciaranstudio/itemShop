const openUserEmail = (e) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const email = "eliwgfell@gmail.com";
  const subject = "Contact from shop";
  const emailBody = "Yeah yeah yeah...";
  document.location =
    "mailto:" + email + "?subject=" + subject + "&body=" + emailBody;
};

export default openUserEmail;
