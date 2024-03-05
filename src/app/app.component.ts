import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './users/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e360CodeAssesment';
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log("Helloooooooooooooooo")
    this.userService.getUser().subscribe(res => {
      console.log("############", res)
    },error => console.log(error))
  }
}
