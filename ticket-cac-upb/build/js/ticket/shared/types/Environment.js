export default class Environment {
    static createAppointment = async (id) => {
        const env = await fetch('./js/env/env.json');
        const json = await env.json();
        const endpoint = json['ticket/create'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${id}`;
    };
}
