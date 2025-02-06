import { Component, signal } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'side-menu',
  standalone: false,

  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItems = signal<MenuItem[]>([
    {title: 'Counter', route: 'counter'},
    {title: 'User Info', route: 'user-info'},
    {title: 'Mutaciones', route: 'properties'},
  ]);

  // public menuItems: MenuItem[] = [
  //   {title: 'Counter', route: 'counter'},
  //   {title: 'User Info', route: 'user-info'},
  //   {title: 'Mutaciones', route: 'properties'},
  // ];
}
