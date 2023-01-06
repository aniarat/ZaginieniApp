

import authAxios from "./authAxios";

function statusAccept(props) {

  const id = JSON.stringify(props.acceptId);
 
  if (window.confirm(`Zaakceptować ${id}`)) {
    authAxios()
      .put(`https://localhost:7162/api/admin/missingPeople/reported/accept/${id}`)
      .then((response) => {
        console.log(response.data)
        console.log("Status zmieniony")
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}
export default statusAccept;
