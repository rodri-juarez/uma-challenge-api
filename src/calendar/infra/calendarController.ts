import {Request, Response} from "express";
import {AddComment} from "../aplication/addComment";
import {GetMonthCalendar} from "../aplication/getMonthCalendar";
import {HttpResponse} from "../../helpers/middlewares/response/httpResponse";


export class CalendarController {
  constructor(
    private readonly addComment: AddComment = new AddComment(),
    private readonly getMonthCalendar: GetMonthCalendar = new GetMonthCalendar(),
    private readonly httpResponse: HttpResponse = new HttpResponse()

  ) {
    this.saveComment = this.saveComment.bind(this);
    this.getMonth = this.getMonth.bind(this);
  }

  async getMonth(req: Request, res: Response) {

    const {
      startDate,
      endDate,
    } = req.query;
    const {id} = req.params

    if (!id || !startDate || !endDate) {
      return this.httpResponse.NotFound(res, 'Fields are missing')
    }

    try {
      const data = await this.getMonthCalendar.execute(id.toString(), startDate?.toString(), endDate?.toString());
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async saveComment(req: Request, res: Response) {

    const {
      date,
      comments} = req.body;
    const {month} = req.params;

    try {
      const data = await this.addComment.execute({month, date, comments});
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }
}
