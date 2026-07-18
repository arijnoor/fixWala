import api from "./api";


export const getUsers = async () => {
  const res = await api.get("/getUser");
  return res.data;
};
export const getApprovedUsers = async () => {
  const res = await api.get("/getApproveUser");
  return res.data;
};

export const getUserAndUpdate = async (id,data) => {
const res = await api.put(`/updateProfile/${id}`, data);
  return res.data;
};
export const getUserById = async (id) => {
  const res = await api.get(`/getUserById/${id}`);
    
  return res.data;
};
export const signupUser = async (data) => {

    const res = await api.post("/signup", data);

    return res.data;

};
export const loginUser = async (data) => {

    const res = await api.post("/login", data);

    return res.data;

};

 
export const approveUser = async (id) => {
  const res = await api.put(`/approve/${id}`);
  return res.data;
};
export const rejectUser = async (id,reason) => {
  const res = await api.put(`/reject/${id}`,{reason,});
  return res.data;
}
export const deleteProvider = async (id,category)=>{
  const res = await api.delete(`/deleteUser/${id}/${category}`);
  return res.data;
}
export const getActiveProvider = async () => {
  const res = await api.get("/activeProvider");
  return res.data;
};

export const getTotalUser = async () => {
  const res = await api.get("/totalUser");
  return res.data;
};

export const getPendingRequest = async () => {
  const res = await api.get("/pendingRequest");
  return res.data;
};

export const getRejectedRequest = async () => {
  const res = await api.get("/rejectRequest");
  return res.data;
};
// For Cards
export const getRejectedUser = async () => {
  const res = await api.get("/getRejectedUser");
  return res.data;
};
export const getPendingUser = async () => {
  const res = await api.get("/getPendingUser");
  return res.data;
};
export const deleteUser = async (id) => {
  const res = await api.delete(`/deleteUser/${id}`);
  return res.data;
};
//for admin
export const getAdminProfile = async (id) => {
  const res = await api.get(`/adminProfile/${id}`);
  return res.data;
};

export const updateAdminProfile = async (id, data) => {
  const res = await api.put(`/updateAdmin/${id}`, data);
  return res.data;
};

export const changePassword = async (id, data) => {
  const res = await api.put(`/changePassword/${id}`, data);
  return res.data;
};