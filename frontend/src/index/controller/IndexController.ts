import IndexModel from '../model/IndexModel.js'
// import IndexView from '../view/IndexView.js'

export default class IndexController {
  // private readonly menu: MenuController
  // private readonly movies: MoviesController
  // private readonly error: ErrorController
  // private readonly contact: ContactController

  constructor(
    private readonly indexModel: IndexModel,
    // private readonly indexView: IndexView,
  ) {
    // this.movies = Movies.create()
    // this.menu = Menu.create()
    // this.error = Error404.create()
    // this.contact = Contact.create()
  }

  public init = async (): Promise<void> => {
    this.indexModel.init()
   //  this.loadMain(this.indexView.getPageFromMeta())

  }
}   
