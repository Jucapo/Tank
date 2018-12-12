import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  flag = true;

  level1 = 5;
  setlevel1 = 0;
  maximum1 = 12;
  minimum1 = 1;
  lowLevel1 = 3;
  highLevel1 = 9;


  tempMaximum;
  tempMinimum;
  tempLowLevel;
  tempHighLevel;

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.tankWather();
  }

  drain() {
    if (confirm('Do you want to drain the tank?')) {
      this.level1 = 0;
      this.toastr.success('Successful operation', 'Tank drain');
      this.tankWather();
    }

  }

  tankWather() {
    $(function () {
      $('.water').animate({
        height: ((this.level1 * 100) / this.maximum1) + '%'
      }, 1000);
    }.bind(this));
    if (this.level1 <= this.lowLevel1) {
      $('.water').css({
        'background-color': 'rgb(255, 255, 0)'
      });
    } else if (this.level1 > this.lowLevel1 && this.level1 < this.highLevel1) {
      $('.water').css({
        'background-color': 'rgb(0, 0, 255)'
      });
    } else {
      $('.water').css({
        'background-color': 'rgb(255, 0, 0)'
      });
    }

  }

  decLevel() {
    if (this.level1 <= this.minimum1) {
      this.toastr.error('Failed operation', 'Minimum level reached');
    } else if ((this.level1 - 1) === this.lowLevel1) {
      this.toastr.warning('Successful operation', 'Low level reached');
      this.level1--;
    } else if (this.level1 <= this.lowLevel1) {
      this.toastr.warning('Successful operation', 'Closest minimum level');
      this.level1--;
    } else {
      this.toastr.success('Successful operation', 'Decreased level');
      this.level1--;
    }
    this.tankWather();
  }

  incLevel() {
    if (this.level1 === this.maximum1) {
      this.toastr.error('Failed operation', 'maximum level reached');
    } else if (this.level1 >= this.highLevel1) {
      this.toastr.warning('Successful operation', 'Closest maximum level');
      this.level1++;
    } else if ((this.level1 - 1) === this.lowLevel1) {
      this.toastr.warning('Successful operation', 'Maximum level reached');
      this.level1++;
    } else {
      this.toastr.success('Successful operation', 'Increased level');
      this.level1++;
    }
    this.tankWather();
  }

  setLevelF(setLevelForm?: NgForm) {
    if (setLevelForm.value.setLevel > this.maximum1) {
      this.toastr.error('Failed operation', 'Maximum level exceeded');
    } else if (setLevelForm.value.setLevel < this.minimum1) {
      this.toastr.error('Failed operation', 'Minimun level exceeded');
    } else {
      this.level1 = setLevelForm.value.setLevel;
      this.toastr.success('Successful operation', 'Set level');
    }
    this.tankWather();
  }


  setSetup(newState, setupForm?: NgForm) {
    this.maximum1 = setupForm.value.maximum;
    this.minimum1 = setupForm.value.minimum;
    this.highLevel1 = setupForm.value.highLevel;
    this.lowLevel1 = setupForm.value.lowLevel;
    this.flag = newState;
    this.toastr.success('Successful operation', 'Tank configured');  
  }

  update(newState) {
    this.flag = newState;
    this.tempMaximum = this.maximum1;
    this.tempMinimum = this.minimum1;
    this.tempLowLevel = this.lowLevel1;
    this.tempHighLevel = this.highLevel1;
  }

  cancel(newState) {
    this.maximum1 = this.tempMaximum;
    this.minimum1 = this.tempMinimum;
    this.lowLevel1 = this.tempLowLevel;
    this.highLevel1 = this.tempHighLevel;
    this.flag = newState;
  }


}
