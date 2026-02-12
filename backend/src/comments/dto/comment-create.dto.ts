export class CreateCommentDto {
  content: string;
  project_id: number;
  author_id: number;

  // Si ces 2 trucs sont là c'est que le commentaire 'initie' un thread
  track_id?: number;
  timestamp?: number | null;

  // si parent_id existe, le commentaire est une réponse dans un thread
  parent_id?: number | null;
}
