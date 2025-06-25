import { Component, inject } from '@angular/core';
import { UsersResponse, User } from '../../interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ally-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersPageComponent {

  public users: User[] = [];
  private usersService = inject(UserService);

  public filterText   = '';
  public currentPage  = 1;
  public itemsPerPage = 5;

  ngOnInit(): void {
    this.loadUsers();
  }

  get filteredUsers(): User[] {
    return this.users.filter(user =>
      user.fullName.toLowerCase().includes(this.filterText.toLowerCase()) ||
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
    this.currentPage = 1;
  }

  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: (response: UsersResponse) => {
        const data = response.users;
        this.users = data
      },
      error: (error) => {
        console.error('Error:', error);
      }
    })
  }
}
