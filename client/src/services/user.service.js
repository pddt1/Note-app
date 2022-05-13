import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/';
class UserService {
  getAllNotes(username) {
    console.log(username);
    return axios.get(API_URL +"retrive",{ headers: authHeader(),params: { username: username}});
  }
  addNote(note) {
    return axios.post(API_URL + 'post',note, { headers: authHeader()});
  }
  deleteNote(id) {
    return axios.delete(API_URL + id, { headers: authHeader() });
  }
}
export default new UserService();