import client from "./client";

const getAllComplexes = () => client.get('');
const updateComplex = (complexID, fields) => client.patch(`${complexID}`, {fields: fields});
const newComplex = (values) => client.post('', values);
const uploadImage = (icon, complexID) => {
    const data = new FormData();
    data.append('icon', icon, icon.name);
    return client.post(`${complexID}`, data);
};
const getComplexByID = (id) => client.get(`${id}`);
const deleteIcon = (id) => client.delete(`${id}`);

const requests = {
    getAllComplexes,
    updateComplex,
    newComplex,
    uploadImage,
    getComplexByID,
    deleteIcon,
}

export default requests;