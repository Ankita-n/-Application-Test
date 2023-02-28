import { ItemService } from './../item.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id!: number;
  item!: Item;
  form!: FormGroup;
  param = {};
  constructor(
    public itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['itemId'];
    this.param = {
      id: this.id,
    };
    this.itemService.find(this.param).subscribe((response) => {
     // console.log(response);
      this.item = response.data;
    });
    this.form = new FormGroup({
      id: new FormControl(this.id),
      name: new FormControl('', [Validators.required]),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      item: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    //console.log(this.form.value);
    this.itemService.update(this.form.value).subscribe((res: any) => {
      console.log('Item updated successfully!');
      this.router.navigateByUrl('item/index');
    });
  }
}
