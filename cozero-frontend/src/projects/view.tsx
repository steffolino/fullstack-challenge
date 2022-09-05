import { Avatar, chakra, Flex, Heading, List, ListIcon, ListItem, Stack, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import TimeAgo from 'react-timeago'
import { TbLeaf } from "react-icons/tb";
import { translate } from "../../utils/language.utils";
import { useCallback, useEffect, useState } from "react";
import { Project } from "../../interfaces/project.interface";
import { useParams } from "react-router";
import ProjectsService from "../../services/ProjectsService";

export const ProjectViewPage = () => {
    const [project, setProject] = useState<Project | null>(null)
    const { id } = useParams<{ id: string }>()

    const fetchProject = useCallback(async (id: string) => {
        const project = await ProjectsService.fetchProjectById(id)
        setProject(project ?? null)
    }, [])

    useEffect(() => {
        if (id) {
            fetchProject(id)
        }
    }, [id, fetchProject])

    if (!project) {
        return <div>Loading...</div>
    }

    const TimeAgeComponent = chakra(TimeAgo)
    const LeafIcon = chakra(TbLeaf)
    const [min, max] = project.co2EstimateReduction

    return (
        <Stack spacing={10}>
            <Heading>
                {project?.name}
            </Heading>
            <Text color='gray.800'>
                {project?.description}
            </Text>
            <List spacing={3}>
                {project.listing.map((item: string, index: number) => (
                    <ListItem key={index}>
                        <Flex gap={4} alignItems='center'>
                            <ListIcon as={TbLeaf} color='green.500' />
                            <Text>{item}</Text>
                        </Flex>
                    </ListItem>
                ))}
            </List>
            <Flex justifyContent='flex-start' gap={4} alignItems='center'>
                <Avatar name={project.owner} size='md' />
                <Stack>
                    <Text color='gray.500' fontWeight='light'>Created by {project.owner}</Text>
                    <TimeAgeComponent color='gray.500' fontWeight='light' date={project.createdAt} />

                </Stack>
            </Flex>
            <Flex gap={4}>
                <LeafIcon size={50} color='green.500' />
                <Stat>
                    <StatLabel>{translate('EMISSIONS_LEARN')}</StatLabel>
                    <StatNumber>{min} - {max}</StatNumber>
                    <Text
                        onClick={() => {
                            window.open("https://wiki.cozero.io/en/log/emission-calculation/emissions-calculation", "_blank");
                        }}
                        cursor='pointer'
                        color='blue.300'
                        fontSize='sm'
                    >
                        {translate('EMISSIONS_LEARN')}
                    </Text>
                </Stat>
            </Flex>
        </Stack>
    );
}
