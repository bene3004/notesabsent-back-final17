import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNoteByID, getCommentByID, getStatusByID } from '../api.jsx';
import { Button, Container, Heading, Text, VStack } from '@chakra-ui/react';

const entityMapID = {
    notes: { fetch: getNoteByID, label: 'Note' },
    comments: { fetch: getCommentByID, label: 'Comment' },
    status: { fetch: getStatusByID, label: 'Status' },
};

const GetEntityByIDPage = () => {
    const { entity, id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            if (!entityMapID[entity]) return;
            try { const res = await entityMapID[entity].fetch(id); setItem(res.data); }
            catch (err) { console.error(err); }
        };
        fetchItem();
    }, [entity, id]);

    if (!entityMapID[entity]) return <Heading>Unknown entity: {entity}</Heading>;
    if (!item) return <Text>Loading...</Text>;

    return (
        <Container maxW={"container.md"}>
            <VStack spacing={4} align="start">
                <Heading>{entityMapID[entity].label} Details</Heading>
                <Text><strong>ID:</strong> {item.id}</Text>
                <Text><strong>Heading:</strong> {item.heading}</Text>
                <Text><strong>Description:</strong> {item.description}</Text>
                <Button as={Link} to={`/${entity}/${id}/edit`}>Edit</Button>
                <Button as={Link} to={`/${entity}/${id}/delete`} colorScheme="red">Delete</Button>
            </VStack>
        </Container>
    );

};

export default GetEntityByIDPage;