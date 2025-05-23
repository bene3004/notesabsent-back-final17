import { useState } from 'react';
import { signup } from '../api.jsx';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signup(form.username, form.password);
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading>Sign Up</Heading>
                <Box w={"full"} p={6} rounded={"lg"} boxShadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder="Username"
                            name="username"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                        />
                        <Input
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                        />
                        <Button colorScheme="green" onClick={handleSignUp} w={"full"}>
                            Sign Up
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default SignUpPage;