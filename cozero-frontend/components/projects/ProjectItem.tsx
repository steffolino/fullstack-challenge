import { Avatar, Box, Button, chakra, Flex, Stack, Text } from "@chakra-ui/react"
import { Project } from "../../interfaces/project.interface"
import { FaLeaf } from "react-icons/fa"
import { MdModeEditOutline } from "react-icons/md"
import { BsFillTrashFill, BsArrowCounterclockwise } from "react-icons/bs"
import TimeAgo from 'react-timeago'
import DeleteProjectConfirmation from "../DeleteProjectConfirmation"
import ActivateProjectConfirmation from "../ActivateProjectConfirmation"
import { useContext, useState } from "react"
import { translate } from "../../utils/language.utils"
import { useNavigate } from "react-router"
import { AuthContext } from "../../context/auth"

interface Props {
    project: Project,
    onDelete: (projectId: string) => void,
    onActivate: (projectId: string) => void,
    isArchive: boolean
}

const LeafIcon = chakra(FaLeaf)
const TimeAgeComponent = chakra(TimeAgo)
//cf. https://react-icons.github.io/react-icons/icons?name=bs
//@TODO: translate icon titles
export default function ProjectItem({ project, onDelete, onActivate, isArchive }: Props) {
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)
    const [isActivateConfirmationOpen, setIsActivateConfirmationOpen] = useState(false)
    const navigate = useNavigate()
    const { context } = useContext(AuthContext)
    const userEmail = context?.user?.email

    const onDeleteAction = () => {
        setIsDeleteConfirmationOpen(false)
        onDelete(project.id)
    }

    const onActivateAction = () => {
        //setIsDeleteConfirmationOpen(false)
        onActivate(project.id)
    }

    return (
        <Box
            border='1px'
            borderColor='gray.500'
            p={6}
            rounded='lg'
            _hover={{
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease-in-out'
            }}
        >
            <Stack spacing={5}>
                <Flex justifyContent='space-between'>
                    <Text fontWeight='bold'>{project.name}</Text>
                    {userEmail === project.owner && (
                        <Flex gap={3}>
                            <MdModeEditOutline cursor='pointer' title="edit" onClick={() => navigate(`/projects/${project.id}/edit`)} />
                                <BsArrowCounterclockwise title="activate" className={isArchive?'':'hidden'} cursor='pointer' onClick={() => setIsActivateConfirmationOpen(true)} />
                                <BsFillTrashFill title="delete"  className={isArchive?'hidden':''} cursor='pointer' onClick={() => setIsDeleteConfirmationOpen(true)} />
                        </Flex>
                    )}
                </Flex>
                <Text textAlign='justify' noOfLines={5}>{project.description}</Text>
                <Flex alignItems='center' gap={2}>
                    <LeafIcon color={'green.500'} />
                    <Text fontWeight='bold' color='green.500'>{project.co2EstimateReduction[0]} - {project.co2EstimateReduction[1]} tons co2e.</Text>
                </Flex>
                <Flex justifyContent='space-between' gap={4} alignItems='center'>
                    <Flex>
                        <Button size='sm' onClick={() => navigate(`/projects/${project.id}`)}>
                            {translate('VIEW_FULL_PROJECT')}
                        </Button>
                    </Flex>
                    <Flex gap={3}>
                        <Flex gap={1} flexDirection='column' justifyContent='flex-end'>
                            <Text color='gray.500' fontWeight='light' fontSize='sm'  >{project.owner}</Text>
                            <TimeAgeComponent date={project.createdAt} textAlign='right' fontSize='sm' color='gray.500' fontWeight='light' />
                        </Flex>
                        <Avatar name={project.owner} size='sm' />
                    </Flex>
                </Flex>
            </Stack>
            <DeleteProjectConfirmation
                isOpen={isDeleteConfirmationOpen}
                onClose={() => setIsDeleteConfirmationOpen(false)}
                onDelete={onDeleteAction}
            />
            <ActivateProjectConfirmation
                isOpen={isActivateConfirmationOpen}
                onClose={() => setIsActivateConfirmationOpen(false)}
                onActivate={onActivateAction}
            />
        </Box>
    )
}