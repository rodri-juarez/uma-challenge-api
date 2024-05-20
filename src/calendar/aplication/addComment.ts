import {db} from "../../helpers/database/database";
import {DayRepository} from "../infra/dayRepository";

interface CalendarProps {
  month: string;
  date: string;
  comments: string[];
}

export class AddComment {
  constructor( private readonly repository: DayRepository = new DayRepository(db, 'month') ) {
    this.execute = this.execute.bind(this);
  }

  async execute({month, date, comments}: CalendarProps) {
    await this.repository.createComment(month, date, comments);
  }
}
