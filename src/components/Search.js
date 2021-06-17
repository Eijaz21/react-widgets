import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Search() {

    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);

    console.log(results);

    useEffect(() => { // function inside useEffect will be run everytime 'term' is changed
        
        const search = async () => {
            const { data } =  await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: "query",
                    list: "search",
                    origin: '*',
                    srsearch: term,
                    format: "json"
                }
            });

            setResults(data.query.search);
        };       
        
        // Will do search if term is not an empty string
        if(term){
            search();
        }
        
    }, [term]);

    const renderedResults = results.map((result) => {
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a 
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
                        className="ui button">Go</a>
                </div>

                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>

                    <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                    
                </div>
            </div>
        )
    });

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input 
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                        className="input" />
                </div>
            </div>
            
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    );
}