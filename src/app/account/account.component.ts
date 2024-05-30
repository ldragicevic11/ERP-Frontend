import { Component, OnInit } from '@angular/core';
import { User } from '../models/models';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{

  users: User[] = [];
  editMode = false;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.navigationService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  deleteUser(userId: number): void {
    this.navigationService.deleteUser(userId).subscribe(() => {
      // Osveži listu korisnika nakon brisanja
      this.getUsers();
    });
  }

  updateUser(user: User): void {
    this.navigationService.updateUser(user.userId, user)
      .subscribe(
        () => {
          console.log('Korisnik je uspešno ažuriran.');
        },
        (error) => {
          console.log('Došlo je do greške prilikom ažuriranja korisnika:', error);
        }
      );
  }
  
}
