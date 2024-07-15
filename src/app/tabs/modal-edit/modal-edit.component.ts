import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProductService } from 'src/app/servicios/product.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent implements OnInit {
  @Input() item: any; // Añadir el decorador @Input para recibir los datos del item
  _id!: string;
  code!: string;
  name!: string;
  category!: string;
  description!: string;
  price!: number;
  amount!: number;

  formGroup!: FormGroup;
  isDisabled: boolean = true;

  constructor(
    private modalCtrl: ModalController,
    private productService: ProductService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    console.log(this.item);

    // Asegúrate de que item está definido antes de usarlo
    if (this.item) {
      this._id = this.item._id;
      this.code = this.item.code;
      this.name = this.item.name;
      this.category = this.item.category;
      this.description = this.item.description;
      this.price = this.item.price;
      this.amount = this.item.amount;
    }
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      name: [this.name || '', Validators.required],
      code: [this.code || '', Validators.required],
      category: [this.category || '', Validators.required],
      description: [this.description || '', Validators.required],
      price: [this.price || '', Validators.required],
      amount: [this.amount || '', Validators.required],
    });
  }

  confirm() {
    let request = {
      id: this._id,
      name: this.name,
      code: this.code,
      category: this.category,
      description: this.description,
      price: this.price,
      amount: this.amount,
    };

    try {
      this.productService.editProduct(request).subscribe(
        (item) => console.log(item)
      );
      this.modalCtrl.dismiss('confirm');
    } catch (error) {
      console.log(error);
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }
}

