export default interface ITicketClientUseCase {
  obtainTicketClient(): Promise<boolean>;
}
