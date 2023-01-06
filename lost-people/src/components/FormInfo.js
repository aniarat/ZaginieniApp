import { useState, useEffect } from "react";

function FormInfo(props) {

    const sectionId = props.sectionId;
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');


    useEffect(() => {

        if (sectionId === "generalModal") {
            setTitle("Ogólne");
            setContent(
                <div className="modal-body">
                    Wypełnij pola danymi osoby zaginionej.
                    <ul>
                        <li><i>Imię</i> - pole wymagane, jeśli nie znasz imienia, wpisz "Nieznane".</li>
                        <li><i>Nazwisko</i> - pole wymagane, jeśli nie znasz nazwiska, wpisz "Nieznane".</li>
                        <li><i>Płeć</i> - pole wymagane, wybierz płeć z listy.</li>
                    </ul>
                </div>
            );
        } else if (sectionId === "birthDateModal") {
            setTitle("Data urodzenia");
            setContent(
                <div className="modal-body">
                    Wpisz datę urodzenia osoby zaginionej.
                    <p></p>
                    Jeśli nie znasz dokładnej <i>daty urodzenia</i> wpisz datę <i>1 stycznia i przybliżony rok urodzenia</i> (pozwoli nam to oszacować przypuszczalny wiek osoby zaginionej).
                </div>
            );
        }
        else if (sectionId === "looksModal") {
            setTitle("Wygląd");
            setContent(
                <div className="modal-body">
                    Wypełnij pola danymi osoby zaginionej.
                    <ul>
                        <li><i>Kolor włosów</i> - pole wymagane, jeśli nie znasz koloru włosów, wybierz z listy opcję "Brak danych".</li>
                        <li><i>Kolor oczu</i> - pole wymagane, jeśli nie znasz koloru oczu, wybierz z listy opcję "Brak danych".</li>
                        <li><i>Wzrost</i> - pole wymagane, wpisz szacunkowy wiek.</li>
                        <li><i>Typ sylwetki</i> - pole wymagane, wybierz z listy typ sylwetki. Jeśli nie jesteś w stanie określić typu sylwetki, wybierz z listy opcję "Brak danych".</li>
                        <li><i>Rasa</i> - pole wymagane, wybierz z listy odpowiedni kolor skóry. Jeśli nie jesteś w stanie określić koloru skóry, wybierz z listy opcję "Brak danych" .</li>
                        <li><i>Cechy wyglądu zewnętrznego</i> - pole nie jest wymagane. Tutaj możesz zawrzeć informacje dotyczące cech szczególnych osoby zaginionej,
                            oraz wszystkie inne informacje dotyczące wyglądu (np. długość włosów).</li>
                    </ul>

                </div>
            );
        }
        else if (sectionId === "residenceModal") {
            setTitle("Miejsce zamieszkania");
            setContent(
                <div className="modal-body">
                    Wypełnij pola danymi osoby zaginionej.
                    <ul>
                        <li><i>Województwo</i> - pole wymagane, wybierz województwo zamieszkania z listy .Jeśli nie znasz województwa, wybierz z listy opcję "Brak danych".
                            Jeśli osoba zaginiona mieszka za granicą, wybierz opcję "Poza granicami Polski".</li>
                        <li><i>Miejscowość</i> - pole nie jest wymagane. Po wybraniu województwa, będziesz mógł wybrać z listy miejscowość oraz odpowiedni powiat zamieszkania.
                            Jeśli nie znasz miejscowości zamieszkania osoby, wybierz z listy opcję "Brak danych".</li>
                    </ul>
                </div>
            );
        }
        else if (sectionId === "lastSeenModal") {
            setTitle("Ostatnio widziany/a");
            setContent(
                <div className="modal-body">
                    Wypełnij pola danymi osoby zaginionej.
                    <ul>
                        <li><i>Data</i> - pole wymagane. Wprowadź datę, kiedy osoba zaginiona była widziana po raz ostatni.</li>
                        <li><i>Województwo</i> - pole wymagane, wybierz  z listy województwo, w którym osoba zaginiona była widziana po raz ostatni.Jeśli nie znasz województwa, wybierz z listy opcję "Brak danych".
                            Jeśli osoba nie zaginęła na terenie Polski, wybierz opcję "Poza granicami Polski".</li>
                        <li><i>Miejscowość</i> - pole nie jest wymagane. Po wybraniu województwa, będziesz mógł wybrać z listy miejscowość oraz odpowiedni powiat, w którym osoba zaginiona była widziana po raz ostatni.
                            Jeśli nie znasz miejscowości, wybierz z listy opcję "Brak danych".</li>
                    </ul>
                </div>
            );
        }
        else if (sectionId === "circumstancesModal") {
            setTitle("Okoliczności zaginięcia");
            setContent(
                <div className="modal-body">
                    <i>Okoliczności zaginięcia</i> - pole nie jest wymagane. Opisz okoliczności zaginięcia osoby (np. co zabrała ze sobą, w co była ubrana).
                </div>
            );
        }
        else if (sectionId === "contactModal") {
            setTitle("Numer kontaktowy");
            setContent(
                <div className="modal-body">
                    Wypełnij pole danymi osoby poszukującej.
                    <ul>
                        <li><i>Numer</i> - pole wymagane. Wpisz numer telefonu, na który powinna kontaktować się policja w razie posiadania informacji na temat osoby zaginionej.</li>
                    </ul>
                </div>
            );
        }
        else if (sectionId === "policeModal") {
            setTitle("Kontakt z policjią");
            setContent(
                <div className="modal-body">
                    Wypełnij pola informacjami dotyczącymi kontaktu z policją.
                    <ul>
                        <li><i>Zgłoszone na policję</i> - pole wymagane. Czy zaginięcie zostało zgłoszone na policję? Po wybraniu opcji "Tak" pojawią się kolejne pytania dotyczące kontaktu z policją.</li>
                        <li><i>Potwierdzone przez policjię</i> - pole wymagane. Czy policja przyjęła zgłoszenie zaginiecia? </li>
                        <li><i>Jednostka policji</i> - pole nie jest wymagane. Do której jednostki policji zostało zgłoszone zaginięcie? </li>
                        <li><i>Kontakt do jednostki policji</i> - pole nie jest wymagane. Wprować numer telefonu jednostki policji, do której zostało zgłoszone zaginięcie. </li>
                    </ul>
                </div>
            );
        }
    }, [sectionId]);

    return (

        <div className="modal fade" id={sectionId} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {content}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Zamknij</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormInfo;