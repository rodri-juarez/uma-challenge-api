import {NasaRepository} from "../infra/nasaRepository";
import {MonthRepository} from "../infra/monthRepository";
import {NasaResponse} from "../../helpers/interfaces/INasa";
import {CalendarMonth} from "../domain/calendarMonth";
import {db} from "../../helpers/database/database";

export class GetMonthCalendar {
  constructor(private readonly repository: MonthRepository = new MonthRepository(db, 'month')) {
    this.execute = this.execute.bind(this);
  }
  async execute(id: string, startDate: string, endDate: string) {
    if (id) {
      try {
        const month = await this.repository.findOne(id);
        if (!!month) {
          return month;
        } else {
          const nasaRepository = new NasaRepository('https://api.nasa.gov/planetary/apod');
          const month: NasaResponse = await nasaRepository.getMonth(startDate, endDate);
          const daysNormalized = month.map((day) => {
            return {
              date: day.date,
              description: day.explanation,
              imgUrl: day?.url ?? '',
              imgUrlHD: day?.hdurl ?? '',
              title: day.title,
              mediaType: day.media_type,
              thumbnailUrl: day.thumbnail_url ?? '',
              comments: []
            }
          })
          const monthNormalizied: CalendarMonth = {
            days: daysNormalized
          }
          await this.repository.create(id, monthNormalizied)
          const data = await this.repository.findOne(id)
          return data;
        }

      } catch (error) {
        throw new Error('Internal error')
      }
    }

  }
}
