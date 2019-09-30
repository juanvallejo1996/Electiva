import { Component, OnInit, Injectable } from '@angular/core';
import { DashboardService } from './dashboard.service'
import { IDropdownSettings } from 'ng-multiselect-dropdown'
import { __values } from 'tslib';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public area = [];
  public unidadMedida = [];
  public dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private dashBoardService: DashboardService) { }

  ngOnInit() {

    this.dashBoardService.areasService().subscribe(dataFinal => {
      this.area = dataFinal.areas; 
    }); 

    this.dropdownSettings = this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.dashBoardService.unidadMedidaService().subscribe(dataFinal => {
      this.unidadMedida = dataFinal.unidadmedida;
      this.dropdownList = [];
      for (var i = 0; i < this.unidadMedida.length; i++) {
        this.dropdownList.push({ item_id: this.unidadMedida[i]["_id"]
          , item_text: this.unidadMedida[i]["nombre"]})
      }
    });

  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


}
