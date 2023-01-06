import moment from "moment";
const ageCount = (props) => {

    const birthDate = props.birth;

    var today = new Date();
    var day1 = String(today.getDate()).padStart(2, '0');
    var month1 = String(today.getMonth() + 1).padStart(2, '0');
    var year1 = today.getFullYear();

    var day2 = moment(birthDate).format('DD');
    var month2 = moment(birthDate).format('MM');
    var year2 = moment(birthDate).format('YYYY');

    var dayDifference = day1 - day2;
    var monthDifference = month1 - month2;
    var yearDifference = year1 - year2;

    if (monthDifference === 0) {
        if (dayDifference < 0) {
            return (yearDifference - 1)
        }
        else {
            return (yearDifference)
        }
    }
    else if (monthDifference < 0) {
        return (yearDifference - 1)
    }
    else {
        return (yearDifference)
    }

}

export default ageCount;