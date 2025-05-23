import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoteByID, updateNote, getCommentByID, updateComment, getStatusByID, updateStatus } from '../api.jsx';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';

const entityMapUpdate = {
    notes: { fetch: getNoteByID, update: updateNote, label: 'Note' },
    comments: { fetch: getCommentByID, update: updateComment, label: 'Comment' },
    status: { fetch: getStatusByID, update: updateStatus, label: 'Status' },
};

const UpdateEntityPage = () => {
    const { entity, id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ heading: '', description: '' });

    useEffect(() => {
        const fetchItem = async () => {
            if (!entityMapUpdate[entity]) return;
            try { const res = await entityMapUpdate[entity].fetch(id); setForm({ heading: res.data.heading, description: res.data.description }); }
            catch (err) { console.error(err); }
        };
        fetchItem();
    }, [entity, id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try { await entityMapUpdate[entity].update(id, form); navigate(`/${entity}`); }
        catch (err) { console.error(err); }
    };

    if (!entityMapUpdate[entity]) return <Heading>Unknown entity: {entity}</Heading>;

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading>Update {entityMapUpdate[entity].label}</Heading>
                <Box w={"full"} p={6} rounded={"lg"} boxShadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder="Heading"
                            name="heading"
                            value={form.heading}
                            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                        />
                        <Input
                            placeholder="Description"
                            name="description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                        />
                        <Button colorScheme="purple" onClick={handleUpdate} w={"full"}>
                            Update
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );

};

export default UpdateEntityPage;