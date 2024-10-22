// import IndexView from '../view/IndexView.js'
export default class IndexController {
    indexModel;
    // private readonly menu: MenuController
    // private readonly movies: MoviesController
    // private readonly error: ErrorController
    // private readonly contact: ContactController
    constructor(indexModel) {
        this.indexModel = indexModel;
        // this.movies = Movies.create()
        // this.menu = Menu.create()
        // this.error = Error404.create()
        // this.contact = Contact.create()
    }
    init = async () => {
        this.indexModel.init();
        //  this.loadMain(this.indexView.getPageFromMeta())
    };
}
