import { ProjectDto } from '../dto/project.dto';
import { Project } from '../entity/project.entity';

export class ProjectMapper {
  static mapProjectEntityToDto(project: Project): ProjectDto {
    return {
      id_project: project.id_project,
      name: project.name,
      description: project.description,
      picture: project.picture,
      creator_id: project.creator.id_user,
      trackCount: project.tracks.length || 0,
      commentCount: project.comments.length || 0,
    };
  }

  static mapProjectEntitiesToDtos(projects: Project[]): ProjectDto[] {
    return projects.map((p) => this.mapProjectEntityToDto(p));
  }
}
