import { Component, OnInit } from '@angular/core';
import { UtiliesService } from 'src/app/services/utilies.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {

  flag = true;
  tempMaximum;
  tempMinimum;
  tempLowLevel;
  tempHighLevel;


  constructor(
    public utilitiesService: UtiliesService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }

  decLevel() {
    if (this.utilitiesService.level <= this.utilitiesService.minimum) {
      this.toastr.error('Failed operation', 'Minimum level reached');
    } else if ((this.utilitiesService.level - 1) === this.utilitiesService.lowLevel) {
      this.toastr.warning('Successful operation', 'Low level reached');
      this.utilitiesService.level--;
    } else if (this.utilitiesService.level <= this.utilitiesService.lowLevel) {
      this.toastr.warning('Successful operation', 'Closest minimum level');
      this.utilitiesService.level--;
    } else {
      this.toastr.success('Successful operation', 'Decreased level');
      this.utilitiesService.level--;
    }
  }

  incLevel() {
    if (this.utilitiesService.level === this.utilitiesService.maximum) {
      this.toastr.error('Failed operation', 'maximum level reached');
    } else if (this.utilitiesService.level >= this.utilitiesService.highLevel) {
      this.toastr.warning('Successful operation', 'Closest maximum level');
      this.utilitiesService.level++;
    } else if ((this.utilitiesService.level - 1) === this.utilitiesService.lowLevel) {
      this.toastr.warning('Successful operation', 'Maximum level reached');
      this.utilitiesService.level++;
    } else {
      this.toastr.success('Successful operation', 'Increased level');
      this.utilitiesService.level++;
    }
  }

  setLevelF(setLevelForm?: NgForm) {
    if (setLevelForm.value.setLevel > this.utilitiesService.maximum) {
      this.toastr.error('Failed operation', 'Maximum level exceeded');
    } else if (setLevelForm.value.setLevel < this.utilitiesService.minimum) {
      this.toastr.error('Failed operation', 'Minimun level exceeded');
    } else {
      this.utilitiesService.level = setLevelForm.value.setLevel;
      this.toastr.success('Successful operation', 'Set level');
    }
  }



  setSetup(newState, setupForm?: NgForm) {

    this.utilitiesService.maximum = setupForm.value.maximum;
    this.utilitiesService.minimum = setupForm.value.minimum;
    this.utilitiesService.highLevel = setupForm.value.highLevel;
    this.utilitiesService.lowLevel = setupForm.value.lowLevel;
    this.flag = newState;
    this.toastr.success('Successful operation', 'Tank configured');
  }

  update(newState) {
    this.flag = newState;
    this.tempMaximum = this.utilitiesService.maximum;
    this.tempMinimum = this.utilitiesService.minimum;
    this.tempLowLevel = this.utilitiesService.lowLevel;
    this.tempHighLevel = this.utilitiesService.highLevel;
  }

  cancel(newState) {
    this.utilitiesService.maximum = this.tempMaximum;
    this.utilitiesService.minimum = this.tempMinimum;
    this.utilitiesService.lowLevel = this.tempLowLevel;
    this.utilitiesService.highLevel = this.tempHighLevel;
    this.flag = newState;
  }

}
