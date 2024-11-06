import Appointment from '../../../shared/types/Appointment.js';
import Client from '../../../shared/types/Client.js';
import Environment from '../../../shared/types/Environment.js';
import NullClient from '../../../shared/types/NullClient.js';
import Subject from '../types/subject.js';
export default class AppointmentMasterDetailModel extends Subject {
    appointmentsList;
    clientList;
    actualClient;
    page;
    constructor() {
        super();
        this.clientList = [];
        this.appointmentsList = [];
        this.actualClient = new NullClient();
        this.page = 0;
    }
    init = async () => {
        this.appointmentsList = await this.getAllAppointments();
        this.clientList = await this.getAllClients();
        this.setClientByPage(this.page);
    };
    getClientList = () => {
        return this.clientList;
    };
    getAppointments = () => {
        return this.appointmentsList;
    };
    getClient = () => {
        if (!this.actualClient.isNull()) {
            return this.actualClient;
        }
        return new NullClient();
    };
    getAllClients = async () => {
        try {
            const uniqueClients = Array.from(new Map(this.appointmentsList.map((appointment) => [
                appointment.getClient().getIdentification(),
                appointment.getClient(),
            ])).values());
            return uniqueClients;
        }
        catch (e) {
            console.error(e);
            return [];
        }
    };
    getAppointmentsPerClient = (identification) => {
        try {
            // Filtra las citas según el identification del cliente
            const filteredAppointments = this.appointmentsList.filter((appointment) => appointment.getClient().getIdentification() === identification);
            return filteredAppointments.sort((a, b) => Number(a.getId()) - Number(b.getId()));
        }
        catch (e) {
            console.error(e);
            return [];
        }
    };
    getAllAppointments = async () => {
        try {
            const response = await fetch(await Environment.getAppointments());
            if (!response.ok) {
                return [];
            }
            const responseData = await response.json();
            console.log(responseData);
            const appointments = responseData.map((data) => {
                const client = new Client(data.client.identification, data.client.name, data.client.lastname, data.client.birthday, data.client.address, data.client.premium);
                return new Appointment(data.id, client, data.type, data.date, data.address, data.description, data.notes);
            });
            const appointmentsCanceled = await this.getAllAppointmentsCanceled();
            const allAppointments = appointments.concat(appointmentsCanceled);
            return allAppointments;
        }
        catch (e) {
            console.error(e);
            return [];
        }
    };
    getAllAppointmentsCanceled = async () => {
        try {
            const response = await fetch(await Environment.getAppointmentsCanceled());
            if (!response.ok) {
                return [];
            }
            const responseData = await response.json();
            console.log(responseData);
            const appointments = responseData.map((data) => {
                const client = new Client(data.client.identification, data.client.name, data.client.lastname, data.client.birthday, data.client.address, data.client.premium);
                return new Appointment(data.id, client, data.type, data.date, data.address, data.description, data.notes);
            });
            return appointments;
        }
        catch (e) {
            console.error(e);
            return [];
        }
    };
    setClientByPage = (page) => {
        if (this.clientList.length === 0) {
            this.page = 0;
            const form = document.querySelector('form');
            form.reset();
        }
        else if (page < 0) {
            this.page = this.clientList.length - 1;
            page = this.page;
        }
        this.actualClient = this.clientList[page] || new NullClient();
        this.page = page;
        // console.log('Page: ' + this.page, ' pageee: ' + page);
        this.notifyAllObservers();
    };
    nextPage = () => {
        //  console.log(this.clientList.length);
        if (this.page < this.clientList.length - 1) {
            this.page++;
            this.setClientByPage(this.page);
        }
        else {
            this.showModal('No hay más registros', 'Error');
            this.page = 0;
            this.setClientByPage(this.page);
        }
    };
    previousPage = () => {
        // console.log(this.actualClient);
        if (this.page > 0) {
            this.page--;
            this.setClientByPage(this.page);
        }
        else {
            this.showModal('No hay más registros', 'Error');
            this.page = this.clientList.length - 1;
            this.setClientByPage(this.page);
        }
    };
    showModal = (message, title) => {
        const modalElement = document.getElementById('modal');
        if (modalElement) {
            const modalTitle = modalElement.querySelector('.modal-title');
            const modalBody = modalElement.querySelector('.modal-body p');
            if (modalTitle) {
                modalTitle.textContent = title;
            }
            if (modalBody) {
                modalBody.textContent = message;
            }
            const modal = new window.bootstrap.Modal(modalElement);
            modal.show();
        }
    };
}
