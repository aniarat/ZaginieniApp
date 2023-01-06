import authAxios from "./authAxios";

function editRole(props) {

  const editRoleId = JSON.stringify(props.editRole);
 
  if (window.confirm(`Czy na pewno chcesz nadać uprawnienia administratora użytkownikowi o ID ${editRoleId}?`)) {
    authAxios()
      .put(`https://localhost:7162/api/admin/users/editRoles/${editRoleId}?roles=Admin`)
      .then((response) => {
        console.log("Pomyślnie zmieniono uprawnienia")
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}
export default editRole;