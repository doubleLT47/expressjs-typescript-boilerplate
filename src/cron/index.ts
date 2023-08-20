import schedule from "node-schedule";

interface IJob {
  id: string;
  job: schedule.Job;
}

class Schedule {
  private jobs: IJob[];
  static instance: Schedule;

  constructor() {
    this.jobs = [];
  }

  public createJob(id: string, task: () => void, rule: Date | string) {
    this.jobs.push({
      id: id,
      job: schedule.scheduleJob(rule, task),
    });
  }

  public removeJob(id: string) {
    if (!id) console.error("id not implement");

    const job: IJob | undefined = this.jobs.find((job) => job.id === id);
    if (job?.job.cancel) job.job.cancel();

    this.jobs = this.jobs.filter((job) => job.id !== id);
  }

  public getJob() {
    return this.jobs;
  }

  static getInstance() {
    if (!Schedule.instance) {
      Schedule.instance = new Schedule();
    }
    return Schedule;
  }
}

const ScheduleInstance = Schedule.getInstance();

export default ScheduleInstance;