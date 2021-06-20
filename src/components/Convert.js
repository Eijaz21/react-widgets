import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Convert({ language, text }) {

    const [translated, setTranslated] = useState('');

    useEffect(() => {
        // effect
        const doTranslation = async () => {

            const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                params: {
                    q: text,
                    target: language.value,
                    key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                }
            });

            setTranslated(data.data.translations[0].translatedText);
        };
        
        doTranslation();
        // return () => {
        //     cleanup
        // }
    }, [language, text])

    return (
        <div>
            <h1 className="ui header">{translated}</h1>
        </div>
    );
}