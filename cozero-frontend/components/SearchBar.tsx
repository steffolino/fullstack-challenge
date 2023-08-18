import { translate } from "../utils/language.utils";
import { ChangeEvent, FormEvent, FormEventHandler, useCallback, useEffect, useState } from "react";
import { Project } from "../interfaces/project.interface";
import ProjectsService from "../services/ProjectsService";
import ProjectItem from "./projects/ProjectItem";
import { useNavigate } from "react-router";
import "../styles/select-sample-style.css";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import SelectSearch from "react-select-search";

export type SelectOption = {
  value:string,
  name:string,
}

interface Props {
  label: string;
  options: SelectOption[]
  onChange: any
}

export const Search = ({label,options,onChange}:Props) => {  
  
  const navigate = useNavigate();
  const [pickerItems, setPickerItems] = useState<SelectOption[]>(options);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  
  return (
      <form>
      <div className="holders">
        <SelectSearch
            className="select-search"
            placeholder={translate("SEARCH_PH")}
            options={options}
            getOptions={(query) => {
              return new Promise((resolve, reject) => {
                if(query.length > 3) {
                  ProjectsService.fetchProjectsByName(query)
                  .then((projects: Project[] | undefined) => {
                  if(projects) {
                      console.log(projects);
                      resolve (
                        projects.map(((p) => ({
                            value: p.id,
                            name: p.name
                        })))
                      );
                  }
                  reject();
                }).catch(reject);                  
                }
              });
            }}
            search
            value=""
            onChange={(value:any) => onChange(value)}
          />
      </div>
      </form>
  )

}