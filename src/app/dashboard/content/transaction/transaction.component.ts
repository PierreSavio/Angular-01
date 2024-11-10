import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit   {
  transaction_history: any[] = [];
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.transactionHistory();
  }

  transactionHistory(){
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login']);
    }

    this.http.post<any>(`http://api.devindex.com`, {
      action: 'transactionHistory'
    }, {
      headers: new HttpHeaders({
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (data) => {
        this.transaction_history = data;
      },
      error: (error) => {
        console.log(error);
      }
    }) 
  }
}
