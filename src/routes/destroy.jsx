import { redirect } from "react-router-dom";
import { deleteImageRecord } from "./records";

export async function action({ params }) {
  await deleteImageRecord(params.imageRecordId);
  return redirect("/admin");
}
