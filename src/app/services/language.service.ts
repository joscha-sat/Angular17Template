import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { tuiLanguageSwitcher } from '@taiga-ui/i18n';
import { Languages } from '../other/enums/languages';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  // BehaviorSubject is used to subscribe to language changes for Taiga UI and FullCalendar Library
  private selectedLanguage$ = new BehaviorSubject<string>(Languages.GERMAN);

  constructor(
    private translate: TranslateService,
    @Inject(tuiLanguageSwitcher) readonly switcher: any,
  ) {}

  /**
   * Initialize translate service for i18n support by ngx-translate.
   */
  initLanguage() {
    this.translate.addLangs([Languages.GERMAN, Languages.ENGLISH]);
    this.translate.setDefaultLang(Languages.GERMAN);
    this.switcher.setLanguage('german');
    const language = localStorage.getItem('language');
    if (language) {
      this.selectedLanguage$.next(language);
      switch (language) {
        case Languages.ENGLISH:
          this.switcher.setLanguage('english');
          break;
        case Languages.GERMAN:
          this.switcher.setLanguage('german');
          break;
      }
    }
    this.translate.use(language || Languages.GERMAN);
  }

  /**
   * Returns the selected language of the application as observable.
   */
  getLanguage() {
    return this.selectedLanguage$.asObservable();
  }

  /**
   * Changes the language of the application.
   * Stores the selected language in the local storage.
   * @param language the selected language by the user
   */
  setLanguage(language: Languages) {
    switch (language) {
      case Languages.ENGLISH:
        this.translate.use(Languages.ENGLISH);
        this.selectedLanguage$.next(Languages.ENGLISH);
        this.switcher.setLanguage('english');
        localStorage.setItem('language', Languages.ENGLISH);
        break;
      case Languages.GERMAN:
        this.translate.use(Languages.GERMAN);
        this.selectedLanguage$.next(Languages.GERMAN);
        this.switcher.setLanguage('german');
        localStorage.setItem('language', Languages.GERMAN);
        break;
    }
  }
}
