import express from 'express';
import {CalendarController} from '../calendar/infra/calendarController';

const calendarRouter = express();

const calendarController = new CalendarController();

calendarRouter.post('/:month', calendarController.saveComment);

calendarRouter.get('/:id', calendarController.getMonth);

export {calendarRouter};
