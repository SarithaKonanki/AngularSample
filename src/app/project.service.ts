import { HttpClient } from '@angular/common/http';
import { Injectable, resolveForwardRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { map } from 'rxjs/operators';

import {Project} from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectForm!: FormGroup;
  

  constructor(private http:HttpClient) { }

  saveProject(projectData: Project){
    this.http
    .post('https://myfirstproject-8979f-default-rtdb.firebaseio.com/postsOf.json', projectData)
    .subscribe();
  }
  fetchProjects(){
   return this.http
    .get<{ [key:string]: Project }>('https://myfirstproject-8979f-default-rtdb.firebaseio.com/postsOf.json')
    .pipe(
      map(responseData => {
        const projectsArray: Project[]=[];
         for(let key in responseData){
          if (responseData.hasOwnProperty(key)) {
            projectsArray.push({...responseData[key], id:key});
          }
        }
         return projectsArray;
    }))
    
  }
  clearProjects(){
    this.http.delete('https://myfirstproject-8979f-default-rtdb.firebaseio.com/postsOf.json').subscribe();
    
  }
}
