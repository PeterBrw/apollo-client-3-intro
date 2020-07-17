import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://countries.trevorblades.com/",
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    sortedCountries: (existing, { readField }) => {
                        const direction = sortOrder();
                        const countries = [...(readField("countries") || [])];

                        return countries.sort((a, b) => {
                            const aName = readField("name", a);
                            const bName = readField("name", b);
                            if (direction === "DESC") {
                                if (aName < bName) return 1;
                                if (aName > bName) return -1;
                                return 0;
                            } else {
                                if (aName < bName) return -1;
                                if (aName > bName) return 1;
                                return 0;
                            }
                        });
                    },
                    country: {
                         read: (existing, { toReference, args }) => {
                            const countryRef = toReference({
                                __typename: "Country",
                                code: args.code,
                            });
                            debugger;
                            return existing ?? countryRef;
                        },
                    },
                },
            },
            Country: {
                keyFields: ["code"],
                fields: {
                    nameWithEmoji: {
                        read: (_, { readField }) => {
                            const name = readField("name");
                            const emoji = readField("emoji");

                            return `${name} ${emoji}`;
                        },
                    },
                },
            },
        },
    }),
});

export const sortOrder = client.cache.makeVar("DESC");

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
