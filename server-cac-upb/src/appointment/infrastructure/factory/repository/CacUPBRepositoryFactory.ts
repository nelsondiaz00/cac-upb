import ICacUPBRepository from '../../../domain/port/driven/IDBRepository';
import CacUPBRepository from '../../repository/database/CacUPBRepository';

export default class CacUPBRepositoryFactory {
  public static readonly create = (): ICacUPBRepository => {
    return new CacUPBRepository();
  };
}
