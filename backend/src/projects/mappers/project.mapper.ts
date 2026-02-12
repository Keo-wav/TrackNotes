import { ProjectDto } from '../dto/project.dto';
import { Project } from '../entity/project.entity';

export class ProjectMapper {
  static mapProjectEntityToDto(project: Project): ProjectDto {
    return {
      id_project: project.id_project,
      name: project.name,
      description: project.description ?? null,
      picture: project.picture ?? null,
      // Use optional chaining just in case a creator isn't joined
      creator_id: project.creator?.id_user ?? 0,
      trackCount: project.trackCount ?? project.tracks?.length ?? 0,
      commentCount: project.commentCount ?? project.comments?.length ?? 0,
    };
  }

  static mapProjectEntitiesToDtos(projects: Project[]): ProjectDto[] {
    return projects.map((p) => this.mapProjectEntityToDto(p));
  }
}
