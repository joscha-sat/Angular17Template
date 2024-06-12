import { Component, inject, OnInit, signal } from '@angular/core';
import { BaseComboboxComponent } from '../../../../shared/base-combobox/base-combobox.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Languages } from '../../../../other/enums/languages';

@Component({
  selector: 'app-settings-language-switcher',
  standalone: true,
  imports: [BaseComboboxComponent, ReactiveFormsModule],
  templateUrl: './settings-language-switcher.component.html',
  styleUrl: './settings-language-switcher.component.scss',
})
export class SettingsLanguageSwitcherComponent implements OnInit {
  fb = inject(FormBuilder);

  dataArray = signal<any[]>([
    {
      name: 'Deutsch',
      id: 'de',
    },
    {
      name: 'Englisch',
      id: 'en',
    },
  ]);

  form = this.fb.group({
    language: {},
  });

  initLanguageFormValue(): void {
    const language = localStorage.getItem('tuiLanguage');
    switch (language) {
      case Languages.ENGLISH: {
        this.form.controls.language.setValue({
          id: Languages.ENGLISH,
          label: 'English',
        });
        break;
      }
      case Languages.GERMAN: {
        this.form.controls.language.setValue({
          id: Languages.GERMAN,
          label: 'Deutsch',
        });
        break;
      }
    }
  }

  ngOnInit(): void {
    this.initLanguageFormValue();
  }
}
