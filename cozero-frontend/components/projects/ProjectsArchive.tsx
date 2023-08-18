import {  Flex, Stack, Text, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { ProjectsEmptyState } from "./ProjectsEmptyState"
import { Project } from "../../interfaces/project.interface";
import ProjectsService from "../../services/ProjectsService";
import { translate } from "../../utils/language.utils";
import ProjectItem from "./ProjectItem";
import { useNavigate } from "react-router";


/* improvement: combine with projectlist component with parameter isActive  */
export default function ProjectsArchive() {
    const [projectList, setProjectList] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const toast = useToast();

    const fetchProjects = useCallback(async () => {
        const projects = await ProjectsService.fetchInactiveProjects()
        if (projects && projects?.length !== 0) {
            setProjectList(projects)
        }
        setIsLoading(false)
    }, [])

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])


    const onDelete = async (projectId: string) => {
        debugger;
        const deletedProject = await ProjectsService.archiveProject(projectId)

        toast({
            title: translate(deletedProject ? 'PROJECT_DELETED' : 'PROJECTED_DELETE_ERROR'),
            description: translate(deletedProject ? "PROJECT_DELETED_DESCRIPTION" : "PROJECT_DELETE_ERROR_DESCRIPTION"),
            status: deletedProject ? 'success' : 'error',
            duration: 9000,
            isClosable: true,
        })

        /*
        if (activatedProject) {
            fetchProjects();
            setProjectList(projectList.filter(project => project.id !== projectId))
        }
        */
        fetchProjects();
    }

    const onActivate = async (projectId: string) => {
        debugger;
        const activatedProject = await ProjectsService.activateProject(projectId)

        toast({
            title: translate(activatedProject ? 'PROJECT_DELETED' : 'PROJECTED_DELETE_ERROR'),
            description: translate(activatedProject ? "PROJECT_DELETED_DESCRIPTION" : "PROJECT_DELETE_ERROR_DESCRIPTION"),
            status: activatedProject ? 'success' : 'error',
            duration: 9000,
            isClosable: true,
        })
        /*
        if (activatedProject) {
            fetchProjects();
            setProjectList(projectList.filter(project => project.id !== projectId))
        }
        */
        fetchProjects();

    }


    if (projectList.length === 0 && !isLoading) {
        return <ProjectsEmptyState isArchive={true} />
    }

    return (
        <Stack spacing={8}>
            {projectList?.map(project => (
                <ProjectItem key={project.id} project={project} onActivate={onActivate} onDelete={onDelete} isArchive={true} />
            ))
            }
            <Flex gap={2} justifyContent='center'>
                <Text>{translate('PROJECTS_FOOTER_CTA')}</Text>
                <Text
                    onClick={() => navigate(`/projects/create`)}
                    cursor='pointer'
                    fontWeight='bold'
                    color='green.500'
                    textAlign='center'
                >
                    {translate('PROJECTS_FOOTER_CTA_BUTTON')}
                </Text>
            </Flex>
        </Stack>
    )
}