import { Component, output } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import {
  TuiFile,
  TuiFileLike,
  TuiFiles,
  TuiFilesComponent,
  TuiInputFiles,
  TuiInputFilesDirective,
} from '@taiga-ui/kit';
import {
  ControlContainer,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, of, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-base-file-upload',
  imports: [
    NgIf,
    TuiInputFiles,
    TuiInputFilesDirective,
    ReactiveFormsModule,
    TuiFilesComponent,
    TuiFile,
    AsyncPipe,
    TuiFiles,
  ],
  templateUrl: './base-file-upload.component.html',
  styleUrl: './base-file-upload.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class BaseFileUploadComponent {
  fileUploaded = output<TuiFileLike | null>();

  protected readonly control = new FormControl<TuiFileLike | null>(
    null,
    Validators.required,
  );

  protected readonly failedFiles$ = new Subject<TuiFileLike | null>();
  protected readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  protected readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap((file) => this.processFile(file)),
  );

  protected removeFile(): void {
    this.control.setValue(null);
  }

  protected processFile(
    file: TuiFileLike | null,
  ): Observable<TuiFileLike | null> {
    this.failedFiles$.next(null);

    if (this.control.invalid || !file) {
      this.loadingFiles$.next(null);
      return of(null);
    }

    this.loadingFiles$.next(file);

    const isSuccess = Math.random() > 0.5;

    if (isSuccess) {
      this.fileUploaded.emit(file);
      this.loadingFiles$.next(null);
      return of(file);
    } else {
      this.failedFiles$.next(file);
      this.loadingFiles$.next(null);
      return of(null);
    }
  }
}
