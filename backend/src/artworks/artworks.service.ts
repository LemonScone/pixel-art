import { Injectable } from '@nestjs/common';
import { Project } from '../projects/project.model';
import { DbService } from '../db/db.service';

@Injectable()
export class ArtworksService {
  constructor(private dbService: DbService) {}

  async getArtWorks(): Promise<Project[]> {
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
                                  , P.createdAt
                               FROM PROJECT P
                               JOIN USER U
                                 ON P.userId = U.id
                              WHERE isPublished = true`;

    const result = await this.dbService.execute<Project>(query_project);

    const query_frame = `SELECT A.id AS projectId
                                , B.id
                                , B.grid
                                , B.animateInterval
                            FROM PROJECT A
                            JOIN FRAME B
                              ON A.id = B.projectId
                            WHERE A.isPublished = true
                          `;

    const result_frame: any = await this.dbService.execute(query_frame);

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
  }
}
