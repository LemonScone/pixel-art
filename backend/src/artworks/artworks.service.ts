import { Inject, Injectable } from '@nestjs/common';
import { Pool, PoolConnection } from 'mysql2/promise';
import { DB_CONNECTION } from 'src/constants';
import { Project } from 'src/projects/project.model';

@Injectable()
export class ArtworksService {
  constructor(
    @Inject(DB_CONNECTION)
    private readonly pool: Pool,
  ) {}

  async getArtWorks(): Promise<Project> {
    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const query_project = `SELECT P.id
                                  , P.userId
                                  , U.username
                                  , P.animate
                                  , P.cellSize
                                  , P.gridColumns
                                  , P.gridRows
                                  , P.pallete
                                  , P.title
                                  , P.description
                                  , P.isPublished 
                                  FROM PROJECT P
                                  JOIN USER U
                                    ON P.userId = U.id
                                  WHERE isPublished = true
                            `;

      const [result]: any = await connectionPool.execute(query_project);

      const query_frame = `SELECT A.id AS projectId
                                , B.id
                                , B.grid
                                , B.animateInterval
                            FROM PROJECT A
                            JOIN FRAME B
                              ON A.id = B.projectId
                            WHERE A.isPublished = true
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
      throw new Error(error.message);
    } finally {
      connectionPool.release();
    }
  }
}
