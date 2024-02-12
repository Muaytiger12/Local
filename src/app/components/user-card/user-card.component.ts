import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { User, UserServiceService } from "../../services/user-service.service";
import { CreateEditUserComponent } from "../create-edit-user/create-edit-user.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserApiServiceService } from "../../services/user-api-service.service";
import { UserLocalStorageService } from "../../services/user-local-storage-service";

@Component({
  selector: "app-user-card",
  templateUrl: "user-card.component.html",
  styleUrl: "user-card.component.css",
})
export class UserCardComponent {
  @Input({ required: true }) user!: User;
  @Output() deleteUser = new EventEmitter<User>();
  @Output() editUser = new EventEmitter<User>();
  private dialog = inject(MatDialog);
  public usersService = inject(UserServiceService);
  private userApiService = inject(UserApiServiceService);
  private userLocal = inject(UserLocalStorageService);

  updateModal(): void {
    const updateUserDialog: MatDialogRef<
      CreateEditUserComponent,
      Pick<User, "id" | "name" | "email" | "phone" | "website" | "username">
    > = this.dialog.open(CreateEditUserComponent, {
      width: "60%",
      height: "500px",
      data: this.user,
    });
    updateUserDialog.afterClosed().subscribe((editedUser) => {
      if (!editedUser) {
        return;
      }
      this.usersService.editUser(editedUser);
      this.userLocal.setItem("user", this.usersService.users);
    });
  }
}
