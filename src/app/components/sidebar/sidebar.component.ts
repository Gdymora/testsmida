import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isExpanded = false;
  element: HTMLElement;

  toggleActive(event: any) {
    debugger;
    event.preventDefault();
    if (this.element !== undefined) {
      this.element.style.backgroundColor = "white";
    }
    var target = event.currentTarget;
    target.style.backgroundColor = "#e51282";
    this.element = target;
  }

}
