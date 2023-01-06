import authAxios from "./authAxios";

function statusReject(props) {

  const id = JSON.stringify(props.rejectId);
 
  if (window.confirm(`Odrzucić ${id}`)) {
    authAxios()
      .put(`https://localhost:7162/api/admin/missingPeople/reported/reject/${id}`)
      .then((response) => {
        console.log(response.data)
        console.log("Status zmieniony")
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}
export default statusReject;
