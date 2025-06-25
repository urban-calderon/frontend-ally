import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'ally-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidebarActive = false;

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.sidebarActive && !target.closest('.sidebar') && !target.closest('.sidebar-toggle')) {
      this.sidebarActive = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const window = event.target as Window;
    if (window.innerWidth > 992 && this.sidebarActive) {
      this.sidebarActive = false;
    }
  }
}
