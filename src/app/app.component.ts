import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProjectService } from './project.service';
import { Project } from './project.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Forms1project';
  projectForm!: FormGroup;
  loadedProjects:Project[] = [];

  constructor(private http:HttpClient,
              private projectService:ProjectService){}

      ngOnInit(){
            this.projectForm= new FormGroup({
                'projectName': new FormControl(null, [Validators.required]),
                'email': new FormControl(null,[Validators.required,Validators.email]),
                'projectStatus': new FormControl('critical')
            });
            this.projectService.fetchProjects().subscribe(
              projects => {
                this.loadedProjects=projects;
              }
            );
      }

  onSaveProject(projectData: Project){
    this.projectService.saveProject(projectData);
    this.projectForm.reset();
  
  }
  onFetchProjects(){
    console.log("on fetch");
    this.projectService.fetchProjects().subscribe(
      projects => {
          this.loadedProjects=projects;
      }
    );
     
  }
  onClearProjects(){
    this.projectService.clearProjects();
    this.loadedProjects=[];
  }
 
}
