export interface Chapter {
  n: string;
  years: string;
  title: string;
  desc: string;
  tech: string[];
}

export interface TrajectoryItem {
  year: string;
  text: string;
}

export interface ApproachItem {
  n: string;
  title: string;
  items: string[];
}
