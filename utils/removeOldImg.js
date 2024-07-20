import fs from "fs";
export const removeOldImage = function (qualifiedImage) {
  let startIndex = qualifiedImage.indexOf("up");
  let oldImagePath = qualifiedImage.slice(startIndex);
  fs.unlinkSync(oldImagePath);
};

let them = "ينفعوك";
