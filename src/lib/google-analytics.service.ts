import { Injectable } from '@angular/core';

(<any>window).dataLayer = (<any>window).dataLayer || [];
(<any>window).gtag = function(){
  (<any>window).dataLayer.push(arguments);
};

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  set js(date:Date){
    console.log(date);
    (<any>window).gtag('js',date);
  }
  
  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null) {
      
      console.log('event');

      (<any>window).gtag('event', eventName, {
      eventCategory,
      eventLabel,
      eventAction,
      eventValue
    })
  }
}
