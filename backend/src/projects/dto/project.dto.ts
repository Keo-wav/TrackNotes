export class ProjectDto {
  id_project: number;
  name: string;
  description: string | null;
  picture: string | null;
  creator_id: number;
  trackCount: number;
  commentCount: number;
}
