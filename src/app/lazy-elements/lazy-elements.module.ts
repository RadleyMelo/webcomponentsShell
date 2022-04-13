import {
  Inject,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
  Type,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyElementDirective } from './lazy-element/lazy-element.directive';
import { LazyElementDynamicDirective } from './lazy-element-dynamic/lazy-element-dynamic.directive';
import {
  ElementConfig,
  HooksConfig,
  LazyElementsLoaderService,
} from './lazy-elements-loader.service';
import {
  LAZY_ELEMENT_CONFIGS,
  LAZY_ELEMENT_ROOT_GUARD,
  LAZY_ELEMENT_ROOT_OPTIONS,
} from './lazy-elements.tokens';

import './ng-dev-mode';

export function createLazyElementRootGuard(
  rootOptions: LazyElementRootOptions
) {
  if (ngDevMode && rootOptions) {
    throw new TypeError(
      `LazyElementsModule.forRoot() called twice. Feature modules should use LazyElementsModule.forFeature() instead.`
    );
  }
  return 'LazyElementsModule.forRoot() multiple execution guard';
}

@NgModule({
  declarations: [LazyElementDirective, LazyElementDynamicDirective],
  imports: [CommonModule],
  exports: [LazyElementDirective, LazyElementDynamicDirective],
  providers: [],
})
export class LazyElementsModule {
  static forRoot(
    options: LazyElementModuleRootOptions
  ): ModuleWithProviders<LazyElementsModule> {
    return {
      ngModule: LazyElementsModule,
      providers: [
        {
          provide: LAZY_ELEMENT_CONFIGS,
          useValue:
            options && options.elementConfigs ? options.elementConfigs : [],
          multi: true,
        },
        {
          provide: LAZY_ELEMENT_ROOT_OPTIONS,
          useValue: options.rootOptions ? options.rootOptions : {},
        },
        {
          provide: LAZY_ELEMENT_ROOT_GUARD,
          useFactory: createLazyElementRootGuard,
          deps: [[LAZY_ELEMENT_ROOT_OPTIONS, new Optional(), new SkipSelf()]],
        },
      ],
    };
  }

  static forFeature(
    options: LazyElementModuleOptions
  ): ModuleWithProviders<LazyElementsModule> {
    return {
      ngModule: LazyElementsModule,
      providers: [
        {
          provide: LAZY_ELEMENT_CONFIGS,
          useValue:
            options && options.elementConfigs ? options.elementConfigs : [],
          multi: true,
        },
      ],
    };
  }

  constructor(
    lazyElementsLoaderService: LazyElementsLoaderService,
    @Optional()
    @Inject(LAZY_ELEMENT_CONFIGS)
    elementConfigsMultiProvider: ElementConfig[][],
    @Optional()
    @Inject(LAZY_ELEMENT_ROOT_GUARD)
    guard: any
  ) {
    if (elementConfigsMultiProvider && elementConfigsMultiProvider.length) {
      elementConfigsMultiProvider
        .filter((configs) => configs.some((config) => !config.isAdded))
        .forEach((configs) => lazyElementsLoaderService.addConfigs(configs));
    }
  }
}

export interface LazyElementModuleOptions {
  elementConfigs?: ElementConfig[];
}

export interface LazyElementModuleRootOptions {
  elementConfigs?: ElementConfig[];
  rootOptions?: LazyElementRootOptions;
}

export interface LazyElementRootOptions {
  loadingComponent?: Type<any>;
  errorComponent?: Type<any>;
  isModule?: boolean;
  importMap?: boolean;
  preload?: boolean;
  hooks?: HooksConfig;
}
