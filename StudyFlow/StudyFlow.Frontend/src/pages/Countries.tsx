import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Header, Loader, Table } from "semantic-ui-react";

interface Country {
    id: number;
    name: string;
    isoCode: string;
}

const Countries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://localhost:7033/api/countries")
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setCountries(res.data);
                } else {
                    console.error("The response is not an array:", res.data);
                }
            })
            .catch((error) => {
                console.error("There was an error fetching the countries!", error);
            })
            .finally(() => {
                setLoading(false); // Establece loading a false cuando la solicitud se completa
            });
    }, []);

    return (
        <Container>
            <Header as="h1">Countries List</Header>
            {loading ? (
                <Loader active inline="centered">
                    Loading...
                </Loader>
            ) : countries.length > 0 ? (
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>ISO Code</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {countries.map((country) => (
                            <Table.Row key={country.id}>
                                <Table.Cell>{country.name}</Table.Cell>
                                <Table.Cell>{country.isoCode}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <p>No countries found.</p>
            )}
        </Container>
    );
};

export default Countries;