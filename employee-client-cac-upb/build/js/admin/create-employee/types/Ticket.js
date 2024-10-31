export default class Ticket {
    turn;
    appointment;
    state;
    _isNull;
    constructor(turn, appointment) {
        this.turn = turn;
        this.appointment = appointment;
        this.state = true;
        this._isNull = false;
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
    }
    getTurn() {
        return this.turn;
    }
    setTurn(turn) {
        this.turn = turn;
    }
    getAppointment() {
        return this.appointment;
    }
    setAppointment(appointment) {
        this.appointment = appointment;
    }
    isNull() {
        return this._isNull;
    }
}
