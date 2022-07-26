import { Nobs, NobsBase } from "../../classes/helpers/Nobs";

export type FotoUploadDto = {
  id: string
  headline: string;
  story: Array<string>;
  date: Date;
  location: Array<string>;
  foldername: string;
  popup?: string;
  image?: string;
};

export class UploadNobs extends NobsBase {
  readonly id: string
  readonly headline: string
  readonly story: Array<string>
  readonly date: Date
  readonly location: Array<string>
  readonly foldername: string
  readonly popup: string
  readonly image: string

  constructor(model: FotoUploadDto)
  constructor(nobs: Nobs, source: UploadNobs)
  constructor(nobs_or_dto: FotoUploadDto | Nobs, source?: UploadNobs) {
    super(nobs_or_dto, source);

    if (!(nobs_or_dto instanceof Nobs) && !(source instanceof UploadNobs)) {
      const model: Partial<FotoUploadDto> = nobs_or_dto;
      this.id = "";
      this.headline = model.headline ?? "";
      this.story = model.story ?? [];
      this.date = model.date ?? new Date();
      this.location = model.location ?? [];
      this.foldername = model.foldername ?? "";
      this.popup = model.popup ?? "";
      this.image = model.image ?? "";
    }
  };

  toDto(): FotoUploadDto {
    return {
      id: "",
      headline: this.headline,
      story: this.story,
      date: this.date,
      location: this.location,
      foldername: this.foldername,
      popup: this.popup,
      image: this.image
    };
  };
};
