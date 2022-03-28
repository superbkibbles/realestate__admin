import client from "./client";

const getAllComplexes = () => client.get("");
const updateComplex = (complexID, fields) =>
  client.patch(`${complexID}`, { fields: fields });
const newComplex = (values) => client.post("", values);
const uploadImage = (icon, complexID) => {
  const data = new FormData();
  data.append("icon", icon, icon.name);
  return client.post(`${complexID}`, data);
};
const getComplexByID = (id) => client.get(`${id}`);
const deleteIcon = (id) => client.delete(`${id}`);
const translateComplex = (complexID, values, lang) =>
  client.patch(`${complexID}/translate`, values, {
    headers: {
      local: lang,
    },
  });

const requests = {
  getAllComplexes,
  updateComplex,
  newComplex,
  uploadImage,
  getComplexByID,
  deleteIcon,
  translateComplex
};

export default requests;
