import { Component, inject, OnInit, signal } from '@angular/core';
import { BaseComboboxComponent } from '../../../../../shared/base-combobox/base-combobox.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LANGUAGE_FULL, Languages } from '../../../../../other/enums/languages';
import { LanguageService } from '../../../../../services/language.service';

@Component({
  selector: 'app-settings-language-switcher',
  imports: [BaseComboboxComponent, ReactiveFormsModule],
  templateUrl: './settings-language-switcher.component.html',
  styleUrl: './settings-language-switcher.component.scss',
})
export class SettingsLanguageSwitcherComponent implements OnInit {
  fb = inject(FormBuilder);
  languageService = inject(LanguageService);

  dataArray = signal<any[]>([
    {
      name: 'German',
      id: 'de',
    },
    {
      name: 'English',
      id: 'en',
    },
  ]);

  form = this.fb.group({
    language: {},
  });

  initLanguageFormValue(): void {
    const language = localStorage.getItem('tuiLanguage');
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

  languageChange(language: any) {
    this.languageService.setLanguage(language.id);
  }
}
