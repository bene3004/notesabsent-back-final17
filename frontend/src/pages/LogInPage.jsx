import { useState } from 'react';
import { addNote, addComment, addStatus } from '../api';
import {Box, Button, Container, Heading, Input, VStack} from "@chakra-ui/react";

const LogInPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleLogin = async (e) => {
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
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading>
                    LogIn
                </Heading>

                <Box
                    w={"full"}
                    p={6}
                    rounded={"lg"}
                    boxShadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={(e) => setFormData( {...formData, [e.target.name]: e.target.value })}
                        />
                        <Input
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        />

                        <Button colorScheme="blue" onClick={handleLogin} w={"full"}>
                            LogIn
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
}