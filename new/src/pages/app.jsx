import React,{useEffect,useState} from 'react';
import moment from 'moment';

const App = () => {
    const [text, setText] = useState("");

    useEffect(() => {
        fetch("https://ide.lambdazen.com/eval/rest/lzsample/services/0sjl0_5FFP8k_qBOhZwP5B/text?secumode=embeded")
            .then(response => response.text())
            .then((res) => {
                console.log(res);
                setText(res);
            })
    }, [])

    return (
        <div class="container">
            <div >{text}</div>
            <div class="date">Date: {moment().format("DD-MMM-YYYY")}</div>
        </div>
    )

}

export default App;