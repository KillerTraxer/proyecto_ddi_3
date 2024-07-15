import { Component, OnInit } from '@angular/core';
import { ProductService } from '../servicios/product.service';
import { ModalController } from '@ionic/angular';
import { ModalEditComponent } from '../tabs/modal-edit/modal-edit.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  productList:any[]=[]
  loader!:HTMLIonLoadingElement;
  open=true;
  constructor(private productService:ProductService,
    private modalCtrl:ModalController
  ) {}

  ngOnInit(): void {
    console.log('entraste a la vista 2');
  }

  ionViewDidEnter(){
    console.log('entraste a la vista 2');

  }

  ionViewWillEnter(){
    this.getProducts()
  }

  async getProducts(){
    try{
      await this.productService.getProducts().subscribe(item=>this.productList=item)
      console.log(this.productList)
    }catch(error){
      console.log(error);
    }
  }

  async edit(item:any){
    const modal = await this.modalCtrl.create({
      component: ModalEditComponent,
      componentProps: {
        item,
      }
    });
    modal.present();

    await modal.onWillDismiss().then(() =>{
      this.getProducts();
    })

    modal.onDidDismiss().then(()=>{
      this.getProducts();
    })
  }

  delete(item:any){
    console.log(item);

  }

}
