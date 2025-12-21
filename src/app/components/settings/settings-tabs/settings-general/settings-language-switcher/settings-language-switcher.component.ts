import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LANGUAGE_FULL, Languages } from '../../../../../other/enums/languages';

interface LanguageOption {
  name: string;
  id: string;
}

@Component({
  selector: 'app-settings-language-switcher',
  imports: [ReactiveFormsModule],
  templateUrl: './settings-language-switcher.component.html',
  styleUrl: './settings-language-switcher.component.scss',
})
export class SettingsLanguageSwitcherComponent implements OnInit {
  fb: FormBuilder = inject(FormBuilder);

  dataArray: WritableSignal<LanguageOption[]> = signal<LanguageOption[]>([
    {
      name: 'German',
      id: 'de',
    },
    {
      name: 'English',
      id: 'en',
    },
  ]);

  // eslint-disable-next-line @typescript-eslint/typedef
  form = this.fb.group({
    language: {},
  });

  initLanguageFormValue(): void {
    const language: string | null = localStorage.getItem('tuiLanguage');
    switch (language) {
      case LANGUAGE_FULL.ENGLISH: {
        this.form.controls.language.setValue({
          id: Languages.ENGLISH,
          label: 'English',
        });
        break;
      }
      case LANGUAGE_FULL.GERMAN: {
        this.form.controls.language.setValue({
          id: Languages.GERMAN,
          label: 'German',
        });
        break;
      }
    }
  }

  ngOnInit(): void {
    this.initLanguageFormValue();
  }
}
