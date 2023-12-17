import axios from 'axios';

const api = axios.create({ baseURL: 'https://likeu-api.onrender.com/' });

api.interceptors.request.use((req) => {

    if (localStorage.getItem("profile")) {
        const profile = JSON.parse(localStorage.getItem("profile"));

        req.headers.Authorization = `Bearer ${profile.token}`;
    }

    return req;
});

export const fetchStories = async () => api.get("/stories");
export const fetchUsers = async () => api.get("/user/users");
export const createStory = async (story) => api.post("/stories", story);
export const updateStory = async (id, story) => api.patch(`/stories/${id}`, story);
export const deleteStory = async (id) => api.delete(`/stories/${id}`);
export const likeStory = async (id) => api.patch(`/stories/${id}/likeStory`);
export const addComment = async (id, comment) => api.patch(`/stories/${id}/addComment`, comment);
export const deleteComment = async (id, comment) => api.patch(`/stories/${id}/deleteComment`, comment);
export const likeComment = async (id, commentData) => api.patch(`/stories/${id}/likeComment`, commentData);


export const login = async (formValues) => api.post("/user/login", formValues);
export const signup = async (formValues) => api.post("/user/signup", formValues);
export const updateUser = async (id, user) => api.patch(`/user/${id}`, user);
export const deleteUser = async (id) => api.delete(`/user/${id}`);
export const updatePassword = async (id, passwords) => api.patch(`/user/newPassword/${id}`, passwords);

export const fetchConversations = async (id) => api.get(`/conversation/${id}`);
export const createConversation = async (members) => api.post("/conversation", members);
export const deleteConversation = async (id) => api.delete(`/conversation/${id}`);

export const fetchMessages = async (conversationId) => api.get(`/messages/${conversationId}`);
export const createMessage = async (message) => api.post("/messages", message);