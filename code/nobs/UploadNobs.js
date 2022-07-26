import { Nobs, NobsBase } from "../../classes/helpers/Nobs";
export class UploadNobs extends NobsBase {
    constructor(nobs_or_dto, source) {
        var _a, _b, _c, _d, _e, _f, _g;
        super(nobs_or_dto, source);
        if (!(nobs_or_dto instanceof Nobs) && !(source instanceof UploadNobs)) {
            const model = nobs_or_dto;
            this.id = "";
            this.headline = (_a = model.headline) !== null && _a !== void 0 ? _a : "";
            this.story = (_b = model.story) !== null && _b !== void 0 ? _b : [];
            this.date = (_c = model.date) !== null && _c !== void 0 ? _c : new Date();
            this.location = (_d = model.location) !== null && _d !== void 0 ? _d : [];
            this.foldername = (_e = model.foldername) !== null && _e !== void 0 ? _e : "";
            this.popup = (_f = model.popup) !== null && _f !== void 0 ? _f : "";
            this.image = (_g = model.image) !== null && _g !== void 0 ? _g : "";
        }
    }
    ;
    toDto() {
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
    }
    ;
}
;
//# sourceMappingURL=UploadNobs.js.map