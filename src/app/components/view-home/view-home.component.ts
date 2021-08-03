import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-view-home',
  templateUrl: './view-home.component.html',
  styleUrls: ['./view-home.component.scss']
})
export class ViewHomeComponent implements OnInit {


  ngOnInit(): void {
    console.log(
      '%cPortfolio:',
      'padding: 3px; color: #fefefe; border-radius: 3px 6px; background: seagreen;',
      'https://alexwarnes.com'
    );
    console.log(
      '%cGitHub:',
      'padding: 3px; color: #fefefe; border-radius: 3px 6px; background: indianred;',
      'https://github.com/AlexWarnes'
    );
    console.log(
      '%cLinkedIn:',
      'padding: 3px; color: #fefefe; border-radius: 3px 6px; background: #0B66C2;',
      'https://www.linkedin.com/in/alexwarnes/'
    );
  }

}
