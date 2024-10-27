export default class Ticket {
    turn;
    appointment;
    _isNull;
    constructor(turn, appointment) {
        this.turn = turn;
        this.appointment = appointment;
        this._isNull = false;
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
