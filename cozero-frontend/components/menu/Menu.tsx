import { translate } from "../../utils/language.utils";
import { Flex } from "@chakra-ui/react"
import MenuItem from "./MenuItem"
import {Search, SelectOption} from "../SearchBar";
import { Project } from "../../interfaces/project.interface";
import ProjectsService from "../../services/ProjectsService";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

export default function Menu() { 
    
    const [optionsList, setSelectOptions] = useState<SelectOption[]>([]);
    const [name, setProjectname] = useState("");
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();


    function onChange(optionValue:any) {
        console.log(optionValue);
        navigate('/projects/'+optionValue);
    }

    useEffect(() => {
        if (optionsList) {
            setSelectOptions(optionsList)
        }
        console.log(optionsList);
    }, [optionsList, setSelectOptions])


  useEffect(() => {
    let list = [];
    ProjectsService.fetchProjects()
      .then((projects: Project[] | undefined) => {
        if(projects) {
            list = projects.map(project => ({ value: project.id, name: project.name }));
            setSelectOptions(list);
            setLoaded(true);    
        }
      })
      .catch((err: Error) => console.log(err));
  }, []);
    

  function onSubmit(e: any) {
    //@TODO: handle submit event?
    e.preventDefault();
  }

  if (loaded) {
        return (
            //@TODO translate Menu Item Labels
            <Flex gap={10}>                
                <MenuItem href="/" title="Home" />
                <MenuItem href="/projects" title="Projects" />
                <MenuItem href="/projectsarchive" title="Archive" />
                <div id="menu_search_wrap">
                    <Search                    
                        label={translate("SEARCH_PROJ_LABEL").toString()}
                        onChange={onChange}
                        options={optionsList.map((o) => ({
                            value: o.value,
                            name: o.name
                          }))}
                    />
                </div>
            </Flex>
        );
    }
    else {
        return (
            <Flex gap={10}>
                <MenuItem href="/" title="Home" />
                <MenuItem href="/projects" title="Projects" />
            </Flex>
        );
    }
}