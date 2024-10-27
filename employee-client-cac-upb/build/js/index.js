import IndexController from './index/controller/IndexController.js';
import IndexModel from './index/model/IndexModel.js';
import IndexView from './index/view/IndexView.js';
const indexModel = new IndexModel();
const indexView = new IndexView();
const cac = new IndexController(indexModel, indexView);
cac.init();
