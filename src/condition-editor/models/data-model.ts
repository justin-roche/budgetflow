

export class DataModel {

    conditions;

    setData(d) {
        this.conditions = d.conditions;
        this.decorateData(this.conditions);
    }

    decorateData(c) {
        this.conditions.forEach(c => {
            c._editing = false;
        });
    }

    createNew() {
        this.conditions.push({_editing: true});
    }



}

