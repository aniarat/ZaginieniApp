import { useEffect, useState } from "react";

function ReportWarning(props) {

    const field = props.fieldName;
    const isOn = props.isOn;
    const [warning, setWarning] = useState('');


    const handleSubmit = () => {
        if (field === "") {
            setWarning("To pole musi zostać uzupełnione!");
        } else {
            setWarning('');
        }

    }

    useEffect(() => {

        if (isOn) {
            handleSubmit();
        }

    }, [isOn, field])


    return (
        <div className="warning">{warning}</div>
    )


}
export default ReportWarning;