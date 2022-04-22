import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class AppIconService {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
      this.iconRegistry.addSvgIcon('microsoft', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icon-microsoft.svg'));
      this.iconRegistry.addSvgIcon('google', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icon-google.svg'));
      this.iconRegistry.addSvgIcon('online', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icon-online.svg'));
      this.iconRegistry.addSvgIcon('money', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icon-money.svg'));
      this.iconRegistry.addSvgIcon('users', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icon-user.svg'));
    }
}
