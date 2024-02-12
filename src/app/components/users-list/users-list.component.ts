import { Component, Input } from '@angular/core';
import { UserApiServiceService } from '../../services/user-api-service.service';
import { User, UserServiceService } from '../../services/user-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { UserLocalStorageService } from '../../services/user-local-storage-service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  @Input() user: User | undefined;
  constructor(
    public userApiService: UserApiServiceService,
    public usersService: UserServiceService,
    private userLocal: UserLocalStorageService,
    private dialog: MatDialog
  ) {}

  // ngOnInit(): void {

  //   this.userApiService.getUsers().subscribe((res)=>{
  //     this.usersService.users = res;
  //   })
  // }

  ngOnInit(): void {
    if (localStorage.getItem('user') === null) {
      this.userApiService.getUsers().subscribe((res) => {
        this.usersService.users = res;
      });
    } 
    // else {
    //   this.userApiService.getItem().subscribe((res) => {
    //     this.usersService.users = res;
    //   });
    //   }
      
    }
  

  //   ngOnInit(): void {
  //  if(this.userLocal.getItem() !== null){
  //   this.usersService.users.push(this.userLocal.getItem());
  //   console.log('if');
  //  } else {
  //   this.userApiService.getItem().subscribe((user)=>{
  //     this.user = user;
  //   })
  //  }
  //   }

  deleteUser(user: User) {
    this.usersService.deleteUser(user.id);
    this.userApiService.setItem(user.id);
  }

  openModal() {
    const createUserDialog = this.dialog.open(CreateEditUserComponent, {
      width: '60%',
      height: '500px',
    });
    createUserDialog.afterClosed().subscribe((user) => {
      if (user) {
        this.usersService.users.push(user);
        this.userApiService.setItem(user);
      }
    });
  }
  editUser(updatedUser: User) {
    this.usersService.editUser(updatedUser);
    
  }
}
