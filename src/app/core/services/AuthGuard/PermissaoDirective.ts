import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';

@Directive({
    selector: '[permissao]',
    standalone: false
})
export class PermissaoDirective {
  constructor(
    private template: TemplateRef<any>,
    private view: ViewContainerRef,
    private authService: AuthGuardService
  ) {}

  @Input() set permissao(permissao: string) {
    if (this.authService.temPermissao(permissao)) {
      this.view.createEmbeddedView(this.template);
    } else {
      this.view.clear();
    }
  }
}
