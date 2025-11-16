export interface ManaColors {
  earth: number;
  fire: number;
  water: number;
  air: number;
}

export type ManaColor = keyof ManaColors;

export interface PlayerState {
  id: number;
  avatar: string;
  life: number;
  manaThreshold: number;
  manaColors: ManaColors;
}