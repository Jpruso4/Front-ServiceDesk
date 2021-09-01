import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUSer: string | null;

  constructor() { }

  ngOnInit(): void {
  }

  logout(){
    
  }

}
