import { Component, OnInit } from '@angular/core';
import { UtiliesService } from 'src/app/services/utilies.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(
    public utilitiesService: UtiliesService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    $(function () {
      $('.water').animate({
        height: '90%'
      }, 5000);
    });
  }

  drain() {
    if (confirm('Do you want to drain the tank?')) {
      this.utilitiesService.level = 0;
      this.toastr.success('Successful operation', 'Tank drain');
    }

  }

}
