import { Component,OnInit,inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe} from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AsyncPipe,LoginComponent,RegisterComponent,HomeComponent,AdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title="User-Management-App"
 
}
