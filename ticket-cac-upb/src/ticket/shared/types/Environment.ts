import EndPoint from './EndPoint.js';

export default class Environment {
  public static readonly createTicket = async (id: string): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['ticket/create'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${id}`;
  };

  public static readonly getQueueTickets = async (): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['ticket/queue'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
  };

  public static readonly getBankByTicket = async (
    ticketTurn: string
  ): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['bank/:ticket'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${ticketTurn}`;
  };
}
