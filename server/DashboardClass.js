//@ts-nocheck

class DashboardClass{

    constructor(tcode,questions,downloadTime){
        this.tcode = tcode;
        this.questions = questions;
        this.downloadTime = downloadTime;

    }

  getDownloadTime(){
            let currentTime = Date.now();
            let timeDifferenceMs = currentTime - this.downloadTime;
            let timeDifferenceHours = (timeDifferenceMs / (1000 * 3600)).toFixed(0);
    return timeDifferenceHours;
  }

  length(){
        return this.questions.length;
  }

  countSlideType(slideType = "canvas"){
    let count = 0;
    for (let i = 0; i < this.questions.length; i++) {
        const question = this.questions[i];
        for (let j = 0; j < question.slides.length; j++) {
            const slide = question.slides[j];
                        if(slide.type == slideType){
                            count +=1;
                        }
        }
    }
    return count;   
    }

    // getCanvasItems(command = "text") {
    //     const items = [];
    //     for (let i = 0; i < this.questions.length; i++) {
    //         const question = this.questions[i];
    //         for (let j = 0; j < question.slides.length; j++) {
    //             const slide = question.slides[j];
    //             if (slide.type === "canvas") {
    //                 for (let k = 0; k < slide.items.length; k++) {
    //                     const item = slide.items[k];
    //                     if (item.extra.command === command) {
    //                         items.push(item);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return items;
    // }
    countCanvasItems(command = "text") {
        let count = 0;
        for (let i = 0; i < this.questions.length; i++) {
            const question = this.questions[i];
            for (let j = 0; j < question.slides.length; j++) {
                const slide = question.slides[j];
                if (slide.type === "canvas") {
                    for (let k = 0; k < slide.items.length; k++) {
                        const item = slide.items[k];
                        if (item.extra.command === command) {
                            count += 1;
                        }
                    }
                }
            }
        }
        return count;
    }
    countAllCanvasItems() {
        let count = 0;
        for (let i = 0; i < this.questions.length; i++) {
            const question = this.questions[i];
            for (let j = 0; j < question.slides.length; j++) {
                const slide = question.slides[j];
                if (slide.type === "canvas") {
                    count += slide.items.length;
                }
            }
        }
        return count;
    }
    

}//clas

module.exports = DashboardClass;