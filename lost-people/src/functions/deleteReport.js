import authAxios from "./authAxios";


function deleteReport(props) {
    const deleteId = props.deleteId;


    if (window.confirm(`Czy na pewno chcesz usunąć zgłoszenie o ID ${deleteId}?`)) {
        authAxios()
            .delete(`https://localhost:7162/api/user/missingPeople/deleteReportedMissingPerson/${deleteId}`)
            .then(function (response) {
                console.log(response);
                console.log("ZGŁOSZENIE USUNIĘTE :)");
              })
              .catch(function (error) {
                console.log(error);
              });
    }


}
export default deleteReport;