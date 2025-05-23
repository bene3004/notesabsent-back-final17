import React, { useState, useEffect } from 'react';
import {
    Container,
    Flex,
    Text,
    HStack,
    Button
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { ColorModeButton } from '../ui/color-mode.jsx';
import { Logger } from '../../logger.js';
import axios from 'axios';

const AUTH_VALIDATE_URL = 'http://localhost:8080/validate';

export default function Navbar({ onLogout }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loggingEnabled, setLoggingEnabled] = useState(Logger.isEnabled());
    const navigate = useNavigate();

    useEffect(() => {
        Logger.log('Navbar mounted. Checking authentication...');
        axios
            .get(AUTH_VALIDATE_URL, { withCredentials: true })
            .then(() => {
                setIsAuthenticated(true);
                Logger.log('User is authenticated.');
            })
            .catch(() => {
                setIsAuthenticated(false);
                Logger.log('User is not authenticated.');
            });
        return () => Logger.log('Navbar unmounted.');
    }, []);

    const handleLogoutClick = () => {
        onLogout();
        setIsAuthenticated(false);
        Logger.log('User logged out.');
        navigate('/login');
    };

    const toggleLogging = () => {
        if (loggingEnabled) {
            Logger.disable();
            Logger.log('Logging disabled.');
        } else {
            Logger.enable();
            Logger.log('Logging enabled.');
        }
        setLoggingEnabled(Logger.isEnabled());
    };

    return (
        <Container maxW="1140px" px={4}>
            <Flex
                h={16}
                alignItems="center"
                justifyContent="space-between"
                flexDir={{ base: 'column', sm: 'row' }}
            >
                <Text
                    fontSize={{ base: '22', sm: '28' }}
                    fontWeight="bold"
                    textTransform="uppercase"
                    textAlign="center"
                    bgGradient="linear(to-r, green.200, pink.500)"
                    bgClip="text"
                >
                    <Link to="/">Notemanagement</Link>
                </Text>

                <HStack spacing={2} alignItems="center">
                    <Link to="/notes">
                        <Button>
                            <PlusSquareIcon fontSize={20} />
                        </Button>
                    </Link>

                    {!isAuthenticated ? (
                        <Link to="/login">
                            <Button colorScheme="blue">Login</Button>
                        </Link>
                    ) : (
                        <Button colorScheme="red" onClick={handleLogoutClick}>
                            Logout
                        </Button>
                    )}

                    <ColorModeButton />

                    <Button onClick={toggleLogging} colorScheme={loggingEnabled ? 'green' : 'gray'}>
                        {loggingEnabled ? 'Disable Logging' : 'Enable Logging'}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
}