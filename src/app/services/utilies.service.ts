import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtiliesService {


  level = 10;
  setlevel = 0;
  maximum = 10;
  minimum = 1;
  lowLevel = 3;
  highLevel = 9;

  constructor() { }

}
