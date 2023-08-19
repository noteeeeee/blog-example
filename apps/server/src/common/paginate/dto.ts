import { ApiProperty } from "@nestjs/swagger";
import { Paginated, PaginateQuery } from "nestjs-paginate";
import { SortBy } from "nestjs-paginate/lib/helper";

export enum SortDirection {
  "ASC" = "ASC",
  "DESC" = "DESC"
}

type CPLHelper<T> = Paginated<T>["links"]
export class PaginateLinksDto<T> implements CPLHelper<T> {
  @ApiProperty({ required: false })
  first?: string;

  @ApiProperty({ required: false })
  previous?: string;

  @ApiProperty()
  current: string;

  @ApiProperty({ required: false })
  next?: string;

  @ApiProperty({ required: false })
  last?: string;
}

type CPMHelper<T> = Omit<Paginated<T>["meta"], "searchBy">
export class PaginateMetaDto<T> implements CPMHelper<T> {
  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty({ type: String, isArray: true })
  sortBy: SortBy<T>;

  @ApiProperty()
  search: string;

  @ApiProperty()
  select: string[];
  
  @ApiProperty({
    required: false,
    type: 'object',
    additionalProperties: {
      oneOf: [
        { type: 'string' }
      ]
    }
  })
  filter?: { [column: string]: string | string[]; };
}

export class PaginatedDto<T> implements Omit<Paginated<T>, 'data'> {
  data: Record<string, any>[];

  @ApiProperty({ type: PaginateMetaDto })
  meta: Paginated<T>["meta"]

  @ApiProperty({ type: PaginateLinksDto })
  links: Paginated<T>["links"]

  constructor(partial: Paginated<T>) {
    Object.assign(this, partial);
  }
}

export class PaginateQueryDto implements PaginateQuery {
  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  limit?: number;

  @ApiProperty({ 
    required: false, 
    type: String, 
    isArray: true, 
    example: ["created:DESC"] 
  })
  sortBy?: [string, string][];

  @ApiProperty({ required: false, isArray: true })
  searchBy?: string[];

  @ApiProperty({ required: false })
  search?: string;

  @ApiProperty({
    required: false,
    type: 'object',
    additionalProperties: {
      oneOf: [
        { type: 'string' }
      ]
    }
  })
  filter?: { [column: string]: string | string[]; };

  @ApiProperty({ required: false })
  path: string;
}