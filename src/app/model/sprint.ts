import { BacklogItem } from './backlog.item';

export default class Sprint {
  uid: string;
  title: string;
  goal: number;
  velocity: number;
  startDate: Date;
  endDate: Date;
  status: Status;
  items: BacklogItem[];

  constructor(title: string, startDate: Date, endDate: Date, status?: Status, goal?: number, velocity?: number, uid?: string) {
    this.uid = uid;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status || Status.NOT_STARTED;
    this.velocity = velocity || 0;
    this.goal = goal || 0;
    this.items = [];
  }

  get statusLabel(): string {
    return labelStatus(this.status);
  }

  isInProgress() {
    return this.status === Status.IN_PROGRESS;
  }

  isGoalAcomplished(): boolean {
    return this.velocity >= this.goal;
  }
};

export enum Status {
  NOT_STARTED,
  IN_PROGRESS,
  COMPLETED
}

export function labelStatus(status: Status) {
  if (status === Status.NOT_STARTED) {
    return "No started";
  } else if (status === Status.IN_PROGRESS) {
    return "In Progress";
  } else {
    return "Completed";
  }
}
