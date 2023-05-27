import {
  Inject,
  Injectable,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { Pool, PoolConnection } from 'mysql2/promise';
import { DB_CONNECTION } from 'src/constants';
import { Project } from './project.model';
import { CreateProjectDto } from './dto/create-dto';
import { UpdateProjectDto } from './dto/update-dto';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(DB_CONNECTION)
    private readonly pool: Pool,
  ) {}

  async getProjectById(id: number): Promise<Project> {
    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const [result] = await connectionPool.execute(
        `SELECT id
                , userId
                , animate
                , cellSize
                , gridColumns
                , gridRows
                , pallete
                , title
                , description
                , isPublished 
                FROM PROJECT 
                WHERE id = ${id}`,
      );

      if (!result[0]) {
        throw new BadRequestException('존재하지 않는 프로젝트입니다.');
      }
      return result[0];
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const { userId, animate, cellSize, gridColumns, gridRows, pallete } =
      createProjectDto;

    if (!userId) throw new BadRequestException('userId가 유효하지 않습니다.');

    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      await connectionPool.execute(`INSERT INTO PROJECT
                                      (
                                        userId
                                      ,  animate
                                      ,  cellSize
                                      ,  gridColumns
                                      ,  gridRows
                                      ,  pallete
                                      ,  isPublished
                                      )
                                    VALUES (
                                      '${userId}'
                                    , ${animate}
                                    , ${cellSize}
                                    , ${gridColumns}
                                    , ${gridRows}
                                    , '${pallete}'
                                    , false
                                    );
        `);

      const queryResult = await connectionPool.query(
        `SELECT LAST_INSERT_ID();`,
      );

      const lastInsertId: number = queryResult[0][0]['LAST_INSERT_ID()'];
      return await this.getProjectById(lastInsertId);
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }

  async updateProject(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<void> {
    const {
      animate,
      cellSize,
      gridColumns,
      gridRows,
      pallete,
      title,
      description,
      isPublished,
    } = updateProjectDto;

    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const existProjectId = await this.getProjectById(id);

      if (!existProjectId) {
        throw new BadRequestException('존재하지 않는 프로젝트입니다.');
      }

      await connectionPool.execute(`UPDATE PROJECT SET
                                    animate = ${animate}
                                    , cellSize = ${cellSize}
                                    , gridColumns = ${gridColumns}
                                    , gridRows = ${gridRows}
                                    , pallete = '${pallete}'
                                    , title = '${title}'
                                    , description = '${description}'
                                    , isPublished = ${isPublished}
                                    WHERE id = ${id}
      `);
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }

  async deleteProject(id: number): Promise<void> {
    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const existProjectId = await this.getProjectById(id);

      if (!existProjectId) {
        throw new BadRequestException('존재하지 않는 프로젝트입니다.');
      }

      await connectionPool.execute(`DELETE FROM PROJECT WHERE id = ${id}`);
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }

  async updatePulishStatus(id: number, status: boolean): Promise<void> {
    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const existProjectId = await this.getProjectById(id);

      if (!existProjectId) {
        throw new BadRequestException('존재하지 않는 프로젝트입니다.');
      }

      await connectionPool.execute(`UPDATE PROJECT SET
                                    isPublished = ${status}
                                    WHERE id = ${id}
      `);
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }
}
