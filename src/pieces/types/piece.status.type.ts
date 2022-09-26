import { technologies } from './technology.enum';

// type pieceStatusKeys = technologie

export type piecesStatus = Record<technologies & 'status', 'string'>;
