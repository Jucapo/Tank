import { Component, OnInit } from '@angular/core';
import { UtiliesService } from 'src/app/services/utilies.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  high;
  low;
  level;
  flag;

  constructor(
    public utilitiesService: UtiliesService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.level = this.utilitiesService.level;
    this.low = this.utilitiesService.lowLevel;
    this.high = this.utilitiesService.highLevel;
    if (this.level < this.low) {
      this.flag = 0;
    }
    if (this.level > this.low && this.level < this.high ) {
      this.flag = 1;
    }
    if (this.level > this.high) {
      this.flag = 2;
    }
  }

  drain() {
    if (confirm('Do you want to drain the tank?')) {
      this.utilitiesService.level = 0;
      this.toastr.success('Successful operation', 'Tank drain');
    }

  }

}
