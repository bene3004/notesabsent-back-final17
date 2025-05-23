import {
    Container,
    Flex,
    Text,
    HStack,
    Button,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { ColorModeButton} from './color-mode.jsx';
import { useState, useEffect } from 'react';
import { Logger } from '../../logger.js';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loggingEnabled, setLoggingEnabled] = useState(Logger.isEnabled());
    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = !!localStorage.getItem('token');
        setIsAuthenticated(loggedIn);
        Logger.log('Navbar mounted. User authenticated:', loggedIn);

        return () => Logger.log('Navbar unmounted.');
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        Logger.log('User logged out.');
        navigate("/login");
    };

    const toggleLogging = () => {
        if (loggingEnabled) {
            Logger.disable();
        } else {
            Logger.enable();
        }
        setLoggingEnabled(Logger.isEnabled());
    };

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row",
                }}
            >
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, green.200, pink.500)"}
                    bgClip={"text"}
                >
                    <Link to={"/"}>Entities Collection</Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/:entity/add"}>
                        <Button>
                            <PlusSquareIcon fontSize={20} />
                        </Button>
                    </Link>

                    {!isAuthenticated ? (
                        <Link to="/login">
                            <Button colorScheme="blue">Login</Button>
                        </Link>
                    ) : (
                        <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
                    )}

                    {/* Theme Toggle Button */}
                    <ColorModeButton />

                    {/* Logging Toggle Button */}
                    <Button onClick={toggleLogging} colorScheme={loggingEnabled ? "green" : "gray"}>
                        {loggingEnabled ? "Disable Logging" : "Enable Logging"}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;