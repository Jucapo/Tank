import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtiliesService {


  level = 5;
  setlevel = 0;
  maximum = 12;
  minimum = 1;
  lowLevel = 3;
  highLevel = 9;

  constructor() { }

}
