import { ApiProperty } from '@nestjs/swagger';

export class EditCommentDto {
  @ApiProperty({
    example:
      'Nah just kidding, the snare is just a bit too bright and you are an okay guy in my book.',
  })
  content: string;
}
