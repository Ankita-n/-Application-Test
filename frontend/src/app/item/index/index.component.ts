import { ItemService } from './../item.service';
import { Component, OnInit } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  items: Item[] = [];
  param = {};

  constructor(public itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getAll().subscribe((response) => {
      this.items = response.data;
      console.log(this.items);
    });
  }

  deleteItem(id: number) {
    this.param = {
      id: id,
    };
    this.itemService.delete(this.param).subscribe((res) => {
      this.items = this.items.filter((item) => item.id !== id);
      console.log('Item deleted successfully!');
    });
  }
}
