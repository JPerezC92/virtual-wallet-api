import { AppDataSource } from "./db";

export function Uow() {
  const queryRunner = AppDataSource.createQueryRunner();

  return {
    connection: () => queryRunner.manager,

    transactional: async <Output>(
      fn: () => Promise<Output>
    ): Promise<Output> => {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const result = await fn();

        await queryRunner.commitTransaction();

        return result;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    },
  };
}
