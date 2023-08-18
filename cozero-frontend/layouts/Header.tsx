import { Box, Button, Flex } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";
import Menu from "../components/menu/Menu";
import { SignInButton } from "../components/SignInButton";
import { translate } from "../utils/language.utils";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
    const navigate = useNavigate()
    const { user, signOut } = useAuth();

    return (
        <header>
            <Flex justifyContent='space-between' p={6}>
                <Menu />
                <Flex alignItems='center' gap={4}>                    
                    <Button
                        className="{"
                        variant="outline"
                        id='new-project'
                        leftIcon={<AiOutlinePlus />}
                        onClick={() => {
                            if(user) {
                                navigate("/projects/create")
                            } else {
                                navigate('/sign-in')
                            }                            
                        }}
                    >
                        {translate('NEW_PROJECT')}
                    </Button>
                    <SignInButton />
                </Flex>

            </Flex>
        </header>
    );
}