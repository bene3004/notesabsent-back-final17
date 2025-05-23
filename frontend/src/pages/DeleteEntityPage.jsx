import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoteByID, deleteNote, getCommentByID, deleteComment, getStatusByID, deleteStatus } from '../api.jsx';
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';

const entityMapDelete = {
    notes: { fetch: getNoteByID, remove: deleteNote, label: 'Note' },
    comments: { fetch: getCommentByID, remove: deleteComment, label: 'Comment' },
    status: { fetch: getStatusByID, remove: deleteStatus, label: 'Status' },
};

const DeleteEntityPage = () => {
    const { entity, id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            if (!entityMapDelete[entity]) return;
            try { const res = await entityMapDelete[entity].fetch(id); setItem(res.data); }
            catch (err) { console.error(err); }
        };
        fetchItem();
    }, [entity, id]);

    const handleDelete = async () => {
        try { await entityMapDelete[entity].remove(id); navigate(`/${entity}`); }
        catch (err) { console.error(err); }
    };

    if (!entityMapDelete[entity]) return <Heading>Unknown entity: {entity}</Heading>;

    return (
        <Container maxW={"container.md"}>
            <VStack spacing={4} align="start">
                <Heading>Delete {entityMapDelete[entity].label}</Heading>
                {!item ? (
                    <Text>Loading...</Text>
                ) : (
                    <>
                        <Text>Are you sure you want to delete this {entityMapDelete[entity].label.toLowerCase()}?</Text>
                        <Text><strong>Heading:</strong> {item.heading}</Text>
                        <Text><strong>Description:</strong> {item.description}</Text>
                        <Box>
                            <Button colorScheme="red" onClick={handleDelete} mr={2}>Yes, Delete</Button>
                            <Button onClick={() => navigate(`/${entity}/${id}`)}>Cancel</Button>
                        </Box>
                    </>
                )}
            </VStack>
        </Container>
    );

};

export default DeleteEntityPage;