export default interface IEmployeeClientUseCase {
  obtainEmployeeClient(module: string): Promise<boolean>;
}
