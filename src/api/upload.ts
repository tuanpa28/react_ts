import instance from "./config";

const uploadImages = (images: any) => {
  return instance.post(`images/upload`, images);
};

const updateImages = (images: any) => {
  return instance.put(`images/${images._id}`, images);
};

const deleteImages = (id: any) => {
  return instance.delete(`images/${id}`);
};

export { uploadImages, updateImages, deleteImages };
