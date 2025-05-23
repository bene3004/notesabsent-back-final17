import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAllNotes, getAllComments, getAllStatus } from '../api.jsx';
import { Box, Button, Container, Heading, Table, Thead, Tbody, Tr, Th, Td, VStack } from '@chakra-ui/react';

const entityMap = {
    notes: { fetch: getAllNotes, label: 'Notes' },
    comments: { fetch: getAllComments, label: 'Comments' },
    status: { fetch: getAllStatus, label: 'Status' },
};

const GetAllEntitiesPage = () => {
    const {entity} = useParams();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [total, setTotal] = useState(0);


    const fetchData = async () => {
        if (!entityMap[entity]) return;
        try {
            const res = await entityMap[entity].fetch(page, limit);
            setData(res.data.data);
            setTotal(res.data.total);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchData(); }, [entity, page]);

    if (!entityMap[entity])
        return <Heading>Unknown entity: {entity}</Heading>;

    return (
        <Container maxW={"container.lg"}>
            <VStack spacing={6} align="stretch">
                <Heading>{entityMap[entity].label}</Heading>
                <Button as={Link} to={`/${entity}/add`} colorScheme="teal">Add {entityMap[entity].label.slice(0, -1)}</Button>
                <Box overflowX="auto">
                    <Table variant="simple">
                        <Thead><Tr><Th>ID</Th><Th>Heading</Th><Th>Description</Th><Th>Actions</Th></Tr></Thead>
                        <Tbody>
                            {data.map(item => (
                                <Tr key={item.id}>
                                    <Td>{item.id}</Td><Td>{item.heading}</Td><Td>{item.description}</Td>
                                    <Td>
                                        <Button as={Link} to={`/${entity}/${item.id}`} size="sm" mr={2}>View</Button>
                                        <Button as={Link} to={`/${entity}/${item.id}/edit`} size="sm" mr={2}>Edit</Button>
                                        <Button as={Link} to={`/${entity}/${item.id}/delete`} size="sm" colorScheme="red">Delete</Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
                <Box>
                    <Button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
                    <Button disabled={page * limit >= total} onClick={() => setPage(p => p + 1)} ml={2}>Next</Button>
                </Box>
            </VStack>
        </Container>
    );
};

export default GetAllEntitiesPage;