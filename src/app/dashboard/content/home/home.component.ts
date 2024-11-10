import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  error_Message: string = '';
  total_amount: number = 0;
  total_count: number = 0;
  recent_transaction: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.getTotalData();
    this.getRecentTransaction();
    this.salesChart();
    // setInterval(() => {this.getRecentTransaction();this.getTotalData(); this.salesChart()}, 10000);
  }

  getTotalData(){
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login']);
    }
    
    this.http.post<any>(`http://api.devindex.com`, {
      action: 'getTotalData'
    }, {
      headers: new HttpHeaders({
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (data) => {
        this.total_amount = data.total_amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
        this.total_count = data.total_count
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getRecentTransaction(){
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login']);
    }

    this.http.post<any>(`http://api.devindex.com`, {
      action: 'getRecentTransaction'
    }, {
      headers: new HttpHeaders({
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (data) => {
        this.recent_transaction = data;
      },
      error: (error) => {
        this.showError(error.message);
      }
    })
  }

  showError(message: string) {
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        this.error_Message = message;
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
            this.router.navigate(['/login']);
        }, 3000);
    }
  }

  salesChart() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
  
    var today = new Date();
    today.setDate(today.getDate() - 1);
    var labels: string[] = [];
    var transactionsByDay: { [key: string]: number } = {};
  
    for (let i = 6; i >= 0; i--) {
      let day = new Date(today);
      day.setDate(today.getDate() - i);
      const formattedDate = day.toLocaleDateString();
      labels.push(formattedDate);
      transactionsByDay[formattedDate] = 0;
    }
  
    this.http.post<any>('http://api.devindex.com', {
      action: 'getDataChart'
    }, {
      headers: new HttpHeaders({
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (transactions) => {
        transactions.forEach((transaction: { transaction_time: string; gross_amount: number }) => {
          const transactionDate = new Date(transaction.transaction_time).toLocaleDateString();
          if (transactionsByDay[transactionDate] !== undefined) {
            transactionsByDay[transactionDate] += 1;
          }
        });

        const dataThisYear = labels.map(label => transactionsByDay[label]);
  
        var options: any = {
          series: [
            {
              type: "area",
              name: "Total Transactions",
              data: dataThisYear.map((value: number, index: number) => ({
                x: labels[index],
                y: value
              }))
            }
          ],
          chart: {
            height: 300,
            fontFamily: "inherit",
            foreColor: "#adb0bb",
            fontSize: "12px",
            offsetX: -15,
            offsetY: 10,
            animations: {
              speed: 500
            },
            toolbar: {
              show: false
            }
          },
          colors: ["#ff6f00"],
          dataLabels: {
            enabled: false
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 0,
              inverseColors: false,
              opacityFrom: 0.1,
              opacityTo: 0,
              stops: [100]
            }
          },
          grid: {
            show: true,
            strokeDashArray: 3,
            borderColor: "#90A4AE50"
          },
          stroke: {
            curve: "smooth",
            width: 2
          },
          xaxis: {
            categories: labels,
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            }
          },
          yaxis: {
            tickAmount: 3
          },
          legend: {
            show: false
          },
          tooltip: {
            theme: "dark"
          }
        };
  
        const salesProfit = document.getElementById("sales-profit");
        if (salesProfit) {
          salesProfit.innerHTML = "";
          var chart = new ApexCharts(salesProfit, options);
          chart.render();
        }
      },
      error: () => {
        console.log('error');
      }
    });
  }   
}
