import {CalendarDay} from "../domain/calendarDay";
import {BaseRepository} from '../../helpers/repositories/baseRepository';
import {Firestore} from "firebase-admin/firestore";

export class DayRepository extends BaseRepository<CalendarDay> {
  constructor(database: Firestore, collectionName: string) {
    super(database, collectionName);
  }
  async createComment(month: string, date: string, comments: string[]): Promise<void> {
    const docSnapshot = await this._collection.doc(month).get();
    if (!docSnapshot.exists) {
      throw new Error('Doc not exist')
    }
    const newValue = docSnapshot.data()?.days.map((day: CalendarDay) => {
      if (day.date === date) {
        return {
          ...day,
          comments: comments,
        }
      }
      return day;
    })
    await this._collection.doc(month).update({days: newValue});
  }
}
