import React, { useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { sortOrder } from "./index";

import { useQuery, gql } from "@apollo/client";
// const COUNTRY = gql`
//     query Country($code: ID!) {
//         country(code: $code) {
//             code
//             name
//             emoji
//             nameWithEmoji @client
//         }
//     }
// `;

const COUNTRIES = gql`
    query Countries {
        sortedCountries @client {
            code
            name
            emoji
            nameWithEmoji
        }
        countries {
            code
            name
            emoji
            nameWithEmoji @client
        }
    }
`;

function App() {
    // const [code, setCode] = useState("");
    // const { data: countryData, loading: countryLoading, error : countryError } = useQuery(
    //     COUNTRY,
    //     {
    //         variables: { code },
    //         skip: code.length !== 2,
    //     }
    // );

    const { data, loading, error } = useQuery(COUNTRIES);

    // const handleChange = (e) => {
    //     setCode(e.target.value);
    // }; 

    useEffect(() => {
        setTimeout(() => sortOrder("ASC"), 5000);
    }, [])

    return (
        <div className="App">
            {error && <h1>{`You broke it! ${error.message}`}</h1>}
            {/* countryError && <h1>{`You broke it! ${countryError.message}`}</h1> */}

            {/* <input type="text" value={code} onChange={handleChange} /> */}

            {/* !countryData || countryLoading ? (
                <h1>Loading country...</h1>
            ) : (
                <>
                    <h1>Country</h1>
                    <h2>{countryData.country.nameWithEmoji}</h2>
                </>
            ) */}

            {!data || loading ? (
                <h1>Loading countries...</h1>
            ) : (
                <>
                    <h1>Countries with Flags</h1>
                    <ul>
                        {data.sortedCountries.map((country) => (
                            <li key={country.code}>
                                <h2>{country.nameWithEmoji}</h2>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default App;
