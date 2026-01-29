import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Navbar } from "../navbar/navbar";
import { RouterOutlet } from "@angular/router";
import { EmployeeList } from "../employee-list/employee-list";

@Component({
  selector: 'app-main-layout',
  imports: [Header, Navbar, RouterOutlet, EmployeeList],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

}
