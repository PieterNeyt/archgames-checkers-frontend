export interface PositionDto {
    row: number;
    col: number;
}

export interface MoveDto {
    fromRow: number;
    fromCol: number;
    toRow: number;
    toCol: number;
    isJump: boolean;
    capturedPositions: PositionDto[];
}

export interface MakeMoveRequest {
    fromRow: number;
    fromCol: number;
    toRow: number;
    toCol: number;
}