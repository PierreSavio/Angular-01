import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  // private apiUrl = 'http://api.devindex.com';
  // private apiUrl = 'https://api.kalengkangart.my.id';

  data_akun: any[] = [];
  view_akun: any;

  nama: string = '';
  no_hp: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  id_akun: string = '';

  formAddAkun: FormGroup;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.formAddAkun = this.fb.group({
      nama: new FormControl('', [Validators.required]),
      no_hp: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.infoAkun();
    this.viewAkun();
  }

  infoAkun() {
    const token = localStorage.getItem('token');
    if (!token) {
        this.router.navigate(['/login']);
    }

    this.http.post<any>('http://api.devindex.com', {
        action: 'infoAkun'
    }, {
        headers: new HttpHeaders({
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
        })
    }).subscribe({
        next: (data) => {
            try {
                const decodedData = jwtDecode(data) as any[];
                this.data_akun = decodedData;
            } catch (error) {
                console.error('Error decoding JWT:', error);
            }
        },
        error: (error) => {
            console.error('Error fetching akun:', error);
        }
    });
  }


  viewAkun(){
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
    this.http.post<any>(`http://api.devindex.com`, {
      action: 'viewAkun'
    }, {
      headers: new HttpHeaders({
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (data) => {
        const decode = jwtDecode(data);
        this.view_akun = decode;
        
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addAkun(){
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    this.http.post<any>(`http://api.devindex.com`, {
      action: 'addAkun',
      data: this.formAddAkun.value
    }, {
      headers: new HttpHeaders({
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (data) => {
        if(data.message === 'successAddAkun'){
          this.ngOnInit();
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  activeAccount(id_akun: string){
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
    this.id_akun = id_akun;

    this.http.post<any>(`http://api.devindex.com`, {
      action: 'activeAccount',
      id_akun: this.id_akun
    }, {
      headers: new HttpHeaders({
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (data) => {
        if(data.message === 'success_setStatus'){
          this.ngOnInit();
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
