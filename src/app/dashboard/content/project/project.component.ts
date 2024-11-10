import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: any[] = [];

  formAddProject: FormGroup;

  message: string = '';
  code: number = 0;
  letIN: string = '';

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.formAddProject = this.fb.group({
      nama_project: new FormControl('', [Validators.required]),
      skalabilitas_project: new FormControl('', [Validators.required]),
      target_selesai: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  addProject(){
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.http.post<any>(`http://api.devindex.com`, {
      action: 'addProject',
      data: this.formAddProject.value
    }, {
      headers: new HttpHeaders({
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (data) => {
        this.message = data.message;
        this.code = data.code;
        this.letIN = data.letIN;

        if(this.letIN == 'approve' && this.code == 200){
          this.loadProjects();
        } else {
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  loadProjects(){
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.http.post<any>(`http://api.devindex.com`, {
      action: 'getProject',
    }, {
      headers: new HttpHeaders({
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }
}