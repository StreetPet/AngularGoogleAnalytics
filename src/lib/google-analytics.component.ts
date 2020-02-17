import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GoogleAnalyticsService } from './google-analytics.service';

declare let gtag: Function;
declare let ga: Function;

@Component({
  selector: 'lib-google-analytics',
  template: `<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id={{id}}"></script>`,
  styles: []
})
export class GoogleAnalyticsComponent implements OnInit {

  @Input()
  public id: string;

  constructor(private service: GoogleAnalyticsService, private router: Router) {
    this.service.js = new Date();
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('config');
        (<any>window).gtag('config', this.id,
          {
            'page_path': event.urlAfterRedirects
          }
        );
      }
    });
  }

}
