export default class Environment {
    static createTicket = async (id) => {
        const env = await fetch('./js/env/env.json');
        const json = await env.json();
        const endpoint = json['ticket/create'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${id}`;
    };
    static getQueueTickets = async () => {
        const env = await fetch('./js/env/env.json');
        const json = await env.json();
        const endpoint = json['ticket/queue'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
    };
    static getBankByTicket = async (ticketTurn) => {
        const env = await fetch('./js/env/env.json');
        const json = await env.json();
        const endpoint = json['bank/:ticket'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${ticketTurn}`;
    };
}
