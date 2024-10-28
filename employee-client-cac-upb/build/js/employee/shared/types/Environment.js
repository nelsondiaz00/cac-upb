export default class Environment {
    static getAppointments = async () => {
        const env = await fetch('./js/env/env.json');
        const json = await env.json();
        const endpoint = json['appointment/get'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
    };
    static getAppointmentsCanceled = async () => {
        const env = await fetch('./js/env/env.json');
        const json = await env.json();
        const endpoint = json['appointment-canceled/get'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
    };
    static createEmployee = async () => {
        const env = await fetch('./js/env/env.json');
        const json = await env.json();
        const endpoint = json['employee/create'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
    };
    static getEmployeeById = async (id) => {
        const env = await fetch('./js/env/env.json');
        const json = await env.json();
        const endpoint = json['appointment/get:id'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${id}`;
    };
}
