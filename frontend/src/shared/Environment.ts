import EndPoint from './EndPoint.js';

export default class Environment {
  public static readonly getClientByIdentification = async (
    id: string
  ): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['client/:id'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${id}`;
  };

  public static readonly createAppointment = async (): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['appointment/create'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
  };

  public static readonly getAppointmentById = async (
    id: string
  ): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['appointment/:id'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${id}`;
  };

  public static readonly updateAppointment = async (): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['appointment/update'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
  };
}
