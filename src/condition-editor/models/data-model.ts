

export class DataModel {

    conditions;
    type;

    setData(d) {
        this.conditions = d.conditions;
        this.decorateData(this.conditions);
    }

    decorateData() {
        this.conditions.forEach(c => {
            c._editing = false;
        });
    }



}

