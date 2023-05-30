import {
  Inject,
  Injectable,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { Pool, PoolConnection } from 'mysql2/promise';
import { DB_CONNECTION } from 'src/constants';
import { Project } from './project.model';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(DB_CONNECTION)
    private readonly pool: Pool,
  ) {}

  async getProjectByUserId(userId: string): Promise<Project> {
    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const query = `SELECT id
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
                      WHERE userId = '${userId}';
                      `;
      const [result]: any = await connectionPool.execute(query);

      const query_frame = `SELECT A.id AS projectId
                                , B.id
                                , B.grid
                                , B.animateInterval
                            FROM PROJECT A
                            JOIN FRAME B
                              ON A.id = B.projectId
                            WHERE A.userId = '${userId}';
                          `;

      const [result_frame]: any = await connectionPool.execute(query_frame);

      const combinedResult = result.map((project) => {
        const frames = result_frame
          .filter((frame) => frame.projectId === project.id)
          .map(({ id, grid, animateInterval }) => ({
            id,
            grid,
            animateInterval,
          }));
        return { ...project, frames };
      });

      return combinedResult;
    } catch (error) {
      console.log(error);
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }

  async getProjectById(id: number): Promise<Project> {
    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const query_project = `SELECT id
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
                              WHERE id = ${id};
                              `;
      const [result] = await connectionPool.execute(query_project);

      const query_frame = `SELECT id
                                , projectid
                                , grid
                                , animateInterval
                            FROM FRAME 
                            WHERE projectId = ${id};
                            `;

      const [result_frame] = await connectionPool.execute(query_frame);

      if (!result[0]) {
        throw new BadRequestException('존재하지 않는 프로젝트입니다.');
      }

      result[0]['frames'] = result_frame;
      return result[0];
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const {
      userId,
      animate,
      cellSize,
      gridColumns,
      gridRows,
      pallete,
      frames,
    } = createProjectDto;

    if (!userId) throw new BadRequestException('userId가 유효하지 않습니다.');

    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      await connectionPool.beginTransaction();

      const query_project = `INSERT INTO PROJECT
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
      `;

      const [result] = await connectionPool.execute(query_project);

      const query_frame = `INSERT INTO FRAME
                          (
                            projectId
                          ,  grid
                          ,  animateInterval
                          )
                          VALUES ?;
                          `;

      const values_frame = [
        frames.map((obj) => [
          result['insertId'],
          obj.grid,
          obj.animateInterval,
        ]),
      ];

      await connectionPool.query(query_frame, values_frame);

      await connectionPool.commit();
      return await this.getProjectById(result['insertId']);
    } catch (error) {
      await connectionPool.rollback();
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
      frames,
    } = updateProjectDto;

    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const existProjectId = await this.getProjectById(id);

      if (!existProjectId) {
        throw new BadRequestException('존재하지 않는 프로젝트입니다.');
      }

      await connectionPool.beginTransaction();

      const query_project = `UPDATE PROJECT SET
                                    animate = ${animate}
                                  , cellSize = ${cellSize}
                                  , gridColumns = ${gridColumns}
                                  , gridRows = ${gridRows}
                                  , pallete = '${pallete}'
                                  , title = '${title}'
                                  , description = '${description}'
                                  , isPublished = ${isPublished}
                              WHERE id = ${id}
                              `;
      await connectionPool.execute(query_project);

      const query_frame = `
        UPDATE FRAME SET 
        grid = CASE id
          ${frames.map((obj) => `WHEN ${obj.id} THEN ?`).join(' ')}
        END,
        animateInterval = CASE id
          ${frames.map((obj) => `WHEN ${obj.id} THEN ?`).join(' ')}
        END
        WHERE id IN (${frames.map((obj) => obj.id).join(', ')})
      `;
      const gridValue = frames.map((f) => f.grid);
      const animateIntervalValue = frames.map((f) => f.animateInterval);
      const values_frame = [...gridValue, ...animateIntervalValue];

      await connectionPool.query(query_frame, values_frame);

      await connectionPool.commit();
    } catch (error) {
      await connectionPool.rollback();
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

      await connectionPool.beginTransaction();
      const query_frame = `DELETE FROM FRAME WHERE projectId = ${id}`;
      const query_project = `DELETE FROM PROJECT WHERE id = ${id}`;

      await connectionPool.execute(query_frame);
      await connectionPool.execute(query_project);

      await connectionPool.commit();
    } catch (error) {
      await connectionPool.rollback();
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      await connectionPool.release();
    }
  }

  async updatePulishStatus(id: number, status: boolean): Promise<void> {
    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const existProjectId = await this.getProjectById(id);

      if (!existProjectId) {
        throw new BadRequestException('존재하지 않는 프로젝트입니다.');
      }

      const query = `UPDATE PROJECT SET
                            isPublished = ${status}
                            WHERE id = ${id}
                      `;
      await connectionPool.execute(query);
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }
}
