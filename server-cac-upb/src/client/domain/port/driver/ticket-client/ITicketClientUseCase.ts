export default interface ITicketClientUseCase {
  obtainTicketClient(module: string): Promise<boolean>;
}
