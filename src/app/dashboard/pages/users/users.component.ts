import { Component } from '@angular/core';
import { User } from '../../../auth/interfaces';

@Component({
  selector: 'ally-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersPageComponent {

  users: User[] = [
    { id: 1, name: 'James Butt', email: 'jbutt@email.com', createdAt: '2015-09-12', lastLogin: '2023-12-20' },
    { id: 1, name: 'Josephine Darakjy', email: 'jdarakjy@email.com', createdAt: '2019-02-08', lastLogin: '2024-01-05' },
    { id: 1, name: 'Art Venere', email: 'av@email.com', createdAt: '2017-05-12', lastLogin: '2024-11-11' },
    { id: 1, name: 'Lenna Paprocki', email: 'lp@email.com', createdAt: '2020-09-14', lastLogin: '2025-01-01' },
    { id: 1, name: 'Donette Foller', email: 'dfoller@email.com', createdAt: '2016-05-19', lastLogin: '2024-12-01' },
    { id: 1, name: 'Simona Morasca', email: 'smorasca@email.com', createdAt: '2018-02-15', lastLogin: '2025-06-01' },
    { id: 1, name: 'Mitsue Tollner', email: 'mt@email.com', createdAt: '2018-02-18', lastLogin: '2025-06-20' },
    { id: 1, name: 'Leota Dilliard', email: 'ld@email.com', createdAt: '2019-08-12', lastLogin: '2025-06-18' },
    { id: 1, name: 'Sage Wieser', email: 'sw@email.com', createdAt: '2018-11-20', lastLogin: '2025-05-30' },
    { id: 1, name: 'Kris Marrier', email: 'km@email.com', createdAt: '2015-07-06', lastLogin: '2024-12-10' }
  ];

  public filterText = '';
  public currentPage = 1;
  public itemsPerPage = 5;

  get filteredUsers(): User[] {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
      user.email.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  get paginatedUsers(): User[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onFilterChange(): void {
    this.currentPage = 1; // Reset to first page when filter changes
  }
}
