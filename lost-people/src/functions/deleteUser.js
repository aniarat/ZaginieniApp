import authAxios from "./authAxios";


function deleteUser(props) {
  const deleteId = props.deleteId;

  if (window.confirm(`Czy na pewno chcesz usunąć użytkownika o ID ${deleteId}?`)) {
    authAxios()
      .delete(`https://localhost:7162/api/admin/users/deleteUser/${deleteId}`)
      .then(function (response) {
        console.log(response);
        console.log("Użytkownik został usunięty :)");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
export default deleteUser;