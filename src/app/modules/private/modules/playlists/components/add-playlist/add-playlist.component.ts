import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormSubmitGroupI } from '@shared/model/form-submit-group.model';
import { UserI } from 'src/app/modules/auth/models/user.model';
import { ErrorManagerService } from 'src/app/modules/core/services/error-manager/error-manager.service';
import { UserService } from 'src/app/modules/core/services/user/user.service';
import { PlaylistsService } from '../../services/playlists.service';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPlaylistComponent {
  @Output() playlistCreated = new EventEmitter<void>();
  form: FormSubmitGroupI;
  user: UserI;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private playlistsService: PlaylistsService,
    private userService: UserService,
    private errorManager: ErrorManagerService
  ) {
    this.initForm();
    this.getCurrentUser();
  }

  onSubmit(): void {
    this.form.submitted = true;
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this.playlistsService
        .addPlaylist(this.user.id, this.form.value.name)
        .subscribe(
          () => {
            this.playlistCreated.emit();
            this.form.submitted = false;
            this.form.reset();
          },
          (error: HttpErrorResponse) => this.errorManager.showError(error)
        );
    }
  }

  private getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      (user: UserI) => {
        this.user = user;
      },
      (error: HttpErrorResponse) => this.errorManager.showError(error)
    );
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(5)]]
    });
  }
}
