const openUserEmail = (e) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const email = "eligfellstudio@gmail.com";
  const subject = "Contact from eligfell.com";
  const emailBody = "";
  document.location =
    "mailto:" + email + "?subject=" + subject + "&body=" + emailBody;
};

export default openUserEmail;
