import {
  Component,
  inject,
  type OnInit,
  signal,
  type WritableSignal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LANGUAGE_FULL, Languages } from '../../../../../other/enums/languages';

type LanguageOption = {
  name: string;
  id: string;
};

@Component({
  selector: 'app-settings-language-switcher',
  imports: [ReactiveFormsModule],
  templateUrl: './settings-language-switcher.component.html',
  styleUrl: './settings-language-switcher.component.scss',
})
export class SettingsLanguageSwitcherComponent implements OnInit {
  fb: FormBuilder = inject(FormBuilder);

  readonly dataArray: WritableSignal<LanguageOption[]> = signal<
    LanguageOption[]
  >([
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

    const englishValue: { id: Languages; label: string } = {
      id: Languages.ENGLISH,
      label: 'English',
    };

    switch (language) {
      case LANGUAGE_FULL.ENGLISH: {
        this.form.controls.language.setValue(englishValue);
        break;
      }
      case LANGUAGE_FULL.GERMAN: {
        this.form.controls.language.setValue({
          id: Languages.GERMAN,
          label: 'German',
        });
        break;
      }
      default: {
        this.form.controls.language.setValue(englishValue);
        break;
      }
    }
  }

  ngOnInit(): void {
    this.initLanguageFormValue();
  }
}
