export default interface IEmployeeClientRetriverService {
  retrieveEmployeeClientByIdentification(
    identification: string
  ): Promise<string>;
}
