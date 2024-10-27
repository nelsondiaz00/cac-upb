import EndPoint from './EndPoint.js';

export default class Environment {
  public static readonly createAppointment = async (
    id: string
  ): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['ticket/create'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${id}`;
  };
}
