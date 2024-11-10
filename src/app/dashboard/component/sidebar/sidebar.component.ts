import { Component, AfterViewInit, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {
  @ViewChildren('sidebarLink') sidebarLinks!: QueryList<ElementRef>;
  activeRoute: string = '';

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects;
        this.updateActiveClass();
      }
    });

    this.activeRoute = this.router.url;
    this.updateActiveClass();
  }

  updateActiveClass(): void {
    this.sidebarLinks.forEach(link => link.nativeElement.classList.remove('active'));
    this.sidebarLinks.forEach(link => {
      const linkUrl = link.nativeElement.getAttribute('routerLink');
      if (this.isActive(linkUrl)) {
        link.nativeElement.classList.add('active');
      }
    });
  }

  isActive(route: string): boolean {
    return this.activeRoute.includes(route);
  }
}






