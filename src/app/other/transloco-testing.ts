import type { ModuleWithProviders } from '@angular/core';
import { TranslocoTestingModule, type TranslocoTestingOptions } from '@jsverse/transloco';
import en from '../../assets/i18n/en.json';
import de from '../../assets/i18n/de.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}): ModuleWithProviders<TranslocoTestingModule> {
  return TranslocoTestingModule.forRoot({
    langs: { en, de },
    translocoConfig: {
      availableLangs: ['en', 'de'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
