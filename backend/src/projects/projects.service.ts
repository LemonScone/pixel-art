import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { Project } from './project.model';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { DbService } from '../db/db.service';
import { Frame } from './frame.model';
import { filter, indexBy, map, pipe, toArray, toAsync } from '@fxts/core';

@Injectable()
export class ProjectsService {
  constructor(private dbService: DbService) {}

  async getProjectByUserId(userId: string) {
    const query = `SELECT id
                        , userId
                        , animate
                        , cellSize
                        , gridColumns
                        , gridRows
                        , pallete
                        , COALESCE(title, '') as title
                        , COALESCE(description, '') as description
                        , isPublished 
                    FROM PROJECT 
                    WHERE userId = '${userId}';
                    `;
    const result: Project[] = await this.dbService.execute<Project>(query);

    const query_frame = `SELECT A.id AS projectId
                              , B.id
                              , B.grid
                              , B.animateInterval
                          FROM PROJECT A
                          JOIN FRAME B
                            ON A.id = B.projectId
                         WHERE A.userId = '${userId}'
                         ORDER BY B.createdAt;`;

    const result_frame: Frame[] = await this.dbService.execute<Frame>(
      query_frame,
    );

    const projects = await pipe(
      result,
      toAsync,
      map(async (project) => {
        const frames = await pipe(
          result_frame,
          toAsync,
          filter(({ projectId }) => projectId === project.id),
          map(({ id, grid, animateInterval }) => ({
            projectId: project.id,
            id,
            grid,
            animateInterval,
          })),
          toArray,
        );

        const frameIds = await pipe(
          frames,
          toAsync,
          map(({ id }) => id),
          toArray,
        );
        const indexedFrames = indexBy(({ id }) => id, frames);

        return {
          ...project,
          isPublished: Boolean(project.isPublished),
          indexedFrames,
          frameIds,
        };
      }),
      toArray,
    );

    return projects;
  }

  async getCurrentProjectByUserId(userId: string) {
    const query = `SELECT PROJECT.id
                        , PROJECT.userId
                        , PROJECT.animate
                        , PROJECT.cellSize
                        , PROJECT.gridColumns
                        , PROJECT.gridRows
                        , PROJECT.pallete
                        , COALESCE(PROJECT.title, '') as title
                        , COALESCE(PROJECT.description, '') as description
                        , PROJECT.isPublished 
                    FROM PROJECT
                   INNER JOIN USER 
                      ON PROJECT.userId = USER.id
                     AND USER.current = PROJECT.id
                   WHERE PROJECT.userId = '${userId}';
                    `;
    const [result] = await this.dbService.execute<Project>(query);

    if (result) {
      const query_frame = `SELECT A.id AS projectId
                                , B.id
                                , B.grid
                                , B.animateInterval
                            FROM PROJECT A
                            JOIN FRAME B
                              ON A.id = B.projectId
                           WHERE A.userId = '${userId}'
                             AND A.id = ${result.id}
                           ORDER BY B.createdAt;`;

      const result_frame: Frame[] = await this.dbService.execute<Frame>(
        query_frame,
      );

      const frameIds = await pipe(
        result_frame,
        filter(({ projectId }) => projectId === result.id),
        map(({ id }) => id),
        toArray,
      );
      const indexedFrames = indexBy((a) => a.id, result_frame);

      result['frameIds'] = frameIds;
      result['indexedFrames'] = indexedFrames;
      result['isPublished'] = Boolean(result.isPublished);
    }

    return result;
  }

  async getProjectById(id: number): Promise<Project> {
    const query_project = `SELECT id
                                , userId
                                , animate
                                , cellSize
                                , gridColumns
                                , gridRows
                                , pallete
                                , COALESCE(title, '') as title
                                , COALESCE(description, '') as description
                                , isPublished 
                            FROM PROJECT 
                            WHERE id = ${id};`;
    const [result] = await this.dbService.execute<Project>(query_project);
    result.isPublished = Boolean(result.isPublished);

    if (!result) {
      throw new BadRequestException('존재하지 않는 프로젝트입니다.');
    }

    const query_frame = `SELECT id
                              , projectid
                              , grid
                              , animateInterval
                          FROM FRAME 
                          WHERE projectId = ${id};`;

    const result_frame = (await this.dbService.execute<Frame>(
      query_frame,
    )) as Frame[];

    const frameIds = await pipe(
      result_frame,
      map((frame) => frame.id),
      toArray,
    );

    result['frameIds'] = frameIds;
    result['indexedFrames'] = indexBy((a) => a.id, result_frame);
    return result;
  }

  async createProject(
    userId: string,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    const { cellSize, gridColumns, gridRows, title, pallete, frames } =
      createProjectDto;

    const conn = await this.dbService.beginTransaction();
    try {
      const query_project = `INSERT INTO PROJECT
                            (
                              userId
                            ,  animate
                            ,  cellSize
                            ,  gridColumns
                            ,  gridRows
                            ,  title
                            ,  pallete
                            ,  isPublished
                            )
                            VALUES (
                              '${userId}'
                            , ${frames.length > 1}
                            , ${cellSize}
                            , ${gridColumns}
                            , ${gridRows}
                            , '${title}'
                            , '${JSON.stringify(pallete)}'
                            , false
                            );
      `;

      await conn.execute(query_project);

      const [lastInsert] = await conn.execute('SELECT LAST_INSERT_ID() as id');
      const projectId = lastInsert[0]['id'];

      if (frames.length > 0) {
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
            projectId,
            JSON.stringify(obj.grid),
            obj.animateInterval,
          ]),
        ];

        await conn.query(query_frame, values_frame);
      }

      await this.dbService.commit(conn);
      return await this.getProjectById(projectId);
    } catch (error) {
      await this.dbService.rollback(conn);
      throw new HttpException({ message: error.message, error }, error.status);
    }
  }

  async createProjects(
    userId: string,
    createProjectDto: CreateProjectDto[],
  ): Promise<void> {
    for (const project of createProjectDto) {
      const { cellSize, gridColumns, gridRows, title, pallete, frames } =
        project;

      const conn = await this.dbService.beginTransaction();
      try {
        const query_project = `INSERT INTO PROJECT
                            (
                               userId
                            ,  animate
                            ,  cellSize
                            ,  gridColumns
                            ,  gridRows
                            ,  title
                            ,  pallete
                            ,  isPublished
                            )
                            VALUES (
                              '${userId}'
                            , ${frames.length > 1}
                            , ${cellSize}
                            , ${gridColumns}
                            , ${gridRows}
                            , '${title}'
                            , '${JSON.stringify(pallete)}'
                            , false
                            );
      `;

        await conn.execute(query_project);

        const [lastInsert] = await conn.execute(
          'SELECT LAST_INSERT_ID() as id',
        );
        const projectId = lastInsert[0]['id'];

        if (frames.length > 0) {
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
              projectId,
              JSON.stringify(obj.grid),
              obj.animateInterval,
            ]),
          ];

          await conn.query(query_frame, values_frame);
        }

        await this.dbService.commit(conn);
      } catch (error) {
        await this.dbService.rollback(conn);
        throw new HttpException(
          { message: error.message, error },
          error.status,
        );
      }
    }
  }

  async updateProject(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const {
      cellSize,
      gridColumns,
      gridRows,
      pallete,
      title,
      description,
      isPublished,
      frames,
    } = updateProjectDto;

    const conn = await this.dbService.beginTransaction();
    try {
      const existProjectId = await this.getProjectById(id);

      if (!existProjectId) {
        throw new BadRequestException('존재하지 않는 프로젝트입니다.');
      }

      const query_project = `UPDATE PROJECT SET
                                    animate = ${frames.length > 1}
                                  , cellSize = ${cellSize}
                                  , gridColumns = ${gridColumns}
                                  , gridRows = ${gridRows}
                                  , pallete = '${JSON.stringify(pallete)}'
                                  , title = '${title}'
                                  , description = '${description}'
                                  , isPublished = ${isPublished}
                              WHERE id = ${id}
                              `;
      await conn.execute(query_project);

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
      const gridValue = frames.map((f) => JSON.stringify(f.grid));
      const animateIntervalValue = frames.map((f) => f.animateInterval);
      const values_frame = [...gridValue, ...animateIntervalValue];

      await conn.query(query_frame, values_frame);

      await this.dbService.commit(conn);

      return await this.getProjectById(id);
    } catch (error) {
      await this.dbService.rollback(conn);
      throw new HttpException({ message: error.message, error }, error.status);
    }
  }

  async deleteProject(id: number): Promise<{ id: number }> {
    const conn = await this.dbService.beginTransaction();
    try {
      const existProjectId = await this.getProjectById(id);

      if (!existProjectId) {
        throw new BadRequestException('존재하지 않는 프로젝트입니다.');
      }

      const query_frame = `DELETE FROM FRAME WHERE projectId = ${id}`;
      const query_project = `DELETE FROM PROJECT WHERE id = ${id}`;

      await conn.execute(query_frame);
      await conn.execute(query_project);

      await this.dbService.commit(conn);

      return { id };
    } catch (error) {
      await this.dbService.rollback(conn);
      throw new HttpException({ message: error.message, error }, error.status);
    }
  }

  async updatePulishStatus(id: number, status: boolean): Promise<void> {
    const existProjectId = await this.getProjectById(id);

    if (!existProjectId) {
      throw new BadRequestException('존재하지 않는 프로젝트입니다.');
    }

    const query = `UPDATE PROJECT 
                      SET isPublished = ${status}
                    WHERE id = ${id}`;
    await this.dbService.execute(query);
  }
}
