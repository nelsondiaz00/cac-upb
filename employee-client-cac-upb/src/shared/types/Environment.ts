import EndPoint from './EndPoint.js';

export default class Environment {
  public static readonly getAppointments = async (): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['appointment/get'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
  };

  public static readonly getAppointmentsCanceled =
    async (): Promise<string> => {
      const env = await fetch('./js/env/env.json');
      const json = await env.json();
      const endpoint = json['appointment-canceled/get'] as EndPoint;
      return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
    };

  public static readonly createEmployee = async (): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['employee/create'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
  };
  public static readonly getEmployeeById = async (
    id: string
  ): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['appointment/get:id'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${id}`;
  };

  public static readonly getTicketById = async (
    turn: string
  ): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['ticket/get:id'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${turn}`;
  };

  public static readonly updateAppointment = async (): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['appointment/update'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
  };

  public static readonly deactivateTicket = async (
    turn: string
  ): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['ticket/deactivate'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${turn}`;
  };
}
