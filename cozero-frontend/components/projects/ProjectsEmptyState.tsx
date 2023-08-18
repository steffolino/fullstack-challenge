import React from "react"
import { Heading, Container, Text, Button } from "@chakra-ui/react"
import { translate } from "../../utils/language.utils"
import { TbMoodEmpty } from "react-icons/tb"
import { useNavigate } from "react-router"

interface Props {
    isArchive: boolean
}

export const ProjectsEmptyState = ({isArchive}: Props) => {
    const navigate = useNavigate()

    return (
        <Container
            gap={5}
            display={'flex'}
            alignItems='center'
            justifyContent={'center'}
            flexDirection='column'>
            <TbMoodEmpty size={60} />
            <Heading size='lg' textAlign='center'>{isArchive? translate('NO_PROJECTS_IN_ARCHIVE_TITLE'):translate('NO_PROJECTS_TITLE')}</Heading>
            <Text>
                {isArchive? '':translate('NO_PROJECTS_DESCRIPTION')}
            </Text>
            <Button className={isArchive?"hidden":""}
                onClick={() => navigate('/projects/create')}
            >
                {translate('CREATE_PROJECT')}
            </Button>
        </Container>
    )
}