import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { LazyElementDynamicDirective } from '../lazy-elements/lazy-element-dynamic/lazy-element-dynamic.directive';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit, OnChanges, OnDestroy {
  public url: any;
  public tag: string;

  @ViewChildren(LazyElementDynamicDirective) directive;

  constructor(private router : Router) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnDestroy(): void {
    alert('destrui o robertinho')
    debugger;
    this.directive.first.destroyEmbeddedView();
  }

  ngOnChanges(changes: SimpleChanges): void {
  //   debugger;
  //  this.directive.first.destroyEmbeddedView();
  }

  ngOnInit(): void {
   
    alert(`inicio alunos`)
    this.url = "http://127.0.0.1:8080/component1-element.js";
    this.tag = "elemento-a";
  }

}
