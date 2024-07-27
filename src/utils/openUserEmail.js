import { CONTACT } from "../data/constants.js";

const openUserEmail = (e) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const email = CONTACT.email;
  const subject = CONTACT.emailSubject;
  const emailBody = CONTACT.emailBody;
  document.location =
    "mailto:" + email + "?subject=" + subject + "&body=" + emailBody;
};

export default openUserEmail;
