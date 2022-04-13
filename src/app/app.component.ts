import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



  title = 'shell';

  ngOnInit(): void {
    // const script = document.createElement('script');
    // script.src = 'http://127.0.0.1:8081/main.js';
    // document.body.appendChild(script);
  }
}
