import { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { addNote, addComment, addStatus } from '../api.jsx';
import {Box, Button, Container, Heading, Input, VStack} from '@chakra-ui/react';
import {useColorModeValue} from "frontend/src/components/ui/color-mode.jsx";

const AddEntityPage = () => {
    const { entity } = useParams(); // 'notes', 'comments', 'status'
    const navigate = useNavigate();
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');

    const handleAddEntity = async (e) => {
        e.preventDefault();
        try {
            const data = { heading, description };
            switch (entity) {
                case 'notes':
                    await addNote(data);
                    break;
                case 'comments':
                    await addComment(data);
                    break;
                case 'status':
                    await addStatus(data);
                    break;
            }
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Add New Entity
                </Heading>

                <Box
                    w={"full"}
                    bg={useColorModeValue("white", "gray.800")}
                    p={6}
                    rounded={"lg"}
                    boxShadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder="Entity Heading"
                            name="heading"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                        />
                        <Input
                            placeholder="Entity Description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <Button colorScheme="purple" onClick={handleAddEntity} w={"full"}>
                            Add Entity
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
}

export default AddEntityPage;