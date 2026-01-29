import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./common/components/header/header";
import { Navbar } from "./common/components/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'demo';
}
