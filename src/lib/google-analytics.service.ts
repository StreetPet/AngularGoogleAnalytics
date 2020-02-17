import { Injectable } from '@angular/core';


(<any>window).dataLayer = (<any>window).dataLayer || [];
(<any>window).gtag = function () {
  console.log(arguments);
  (<any>window).dataLayer.push(arguments);
};

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  

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

  loadScript(id: string):Promise<void> {
    return new Promise((resolve, reject) => {
      //https://stackoverflow.com/questions/45861526/load-js-script-on-component-level-not-at-startup/45917264#45917264
      //https://stackoverflow.com/questions/44204417/dynamically-load-external-javascript-file-from-angular-component
      const body = <HTMLDivElement>document.body;
      const script = document.createElement('script');
      script.innerHTML = '';
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      script.async = false;
      script.defer = true;
      script.onload = function () {
        (<any>window).gtag('js', new Date());
        resolve();
      };
      script.onerror = function (error) {
        reject(error);
      }
      body.appendChild(script);
    });
  }
}
