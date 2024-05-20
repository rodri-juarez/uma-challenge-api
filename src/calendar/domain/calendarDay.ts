
export class CalendarDay {
  constructor(
    public readonly date: string,
    public readonly comments: string[],
    public readonly title?: string,
    public readonly description?: string,
    public readonly imgUrlHD?: string | undefined,
    public readonly imgUrl?: string | undefined,
    public readonly thumbnailUrl?: string | undefined,
  ) {
    this.date = date;
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
    this.imgUrlHD = imgUrlHD;
    this.comments = comments;
    this.thumbnailUrl = thumbnailUrl;
  }
}
