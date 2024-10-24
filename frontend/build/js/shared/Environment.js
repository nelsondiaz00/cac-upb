export default class Environment {
    static getClientByIdentification = async (id) => {
        const env = await fetch('./js/env/env.json');
        const json = await env.json();
        const endpoint = json['client/:id'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${id}`;
    };
    static createAppointment = async () => {
        const env = await fetch('./js/env/env.json');
        const json = await env.json();
        const endpoint = json['appointment/create'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
    };
    static getAppointmentById = async (id) => {
        const env = await fetch('./js/env/env.json');
        const json = await env.json();
        const endpoint = json['appointment/:id'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${id}`;
    };
    static updateAppointment = async () => {
        const env = await fetch('./js/env/env.json');
        const json = await env.json();
        const endpoint = json['appointment/update'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
    };
}
