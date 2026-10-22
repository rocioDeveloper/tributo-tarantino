export interface Film {
  id: string;
  year: number;
  title: string;
  runtime: number;
  genre: string;
  /** Número en la filmografía según Tarantino (Kill Bill 1 y 2 cuentan como una). */
  num: string;
  /** Nombre del archivo en public/assets sin extensión. null = aún no hay imagen. */
  poster: string | null;
  spine: string | null;
  /** Colores de respaldo para el lomo cuando no hay imagen. */
  color?: string;
  ink?: string;
  cast: string[];
  synopsis: string;
  note: string;
}

export type AwardType = 'oscar' | 'globe' | 'bafta' | 'cannes' | 'cc';

export interface Award {
  type: AwardType;
  year: number;
  label: string;
}
