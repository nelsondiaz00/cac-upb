export default class QueueTicketController {
    model;
    view;
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    init() {
        this.model.init();
        this.view.init();
    }
}
