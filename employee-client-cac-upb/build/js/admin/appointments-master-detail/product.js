import ProductController from './controller/Appointments-controller.js';
import ProductsModel from './model/Appointments-model.js';
import ProductsView from './view/Appointments-view.js';
export default class Product {
    static create() {
        const model = new ProductsModel();
        const view = new ProductsView(model);
        const controller = new ProductController(model, view);
        return controller;
    }
}
