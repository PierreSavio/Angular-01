import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit() {
    this.ambilDataUser();
  }
  
  // private apiUrl = 'http://api.devindex.com'; Private Local
  // private apiUrl = 'https://api.kalengkangart.my.id'; Public


  ambilDataUser() {
    const token = localStorage.getItem('token');

    this.http.post<any>(`http://api.devindex.com`, {
      action: 'getData'
    }, {
      headers: new HttpHeaders({
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        this.router.navigate(['/login']);
      }
    });
  }
}
